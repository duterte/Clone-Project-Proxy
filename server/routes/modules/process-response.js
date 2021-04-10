'use strict';

const fs = require('fs-extra');
const path = require('path');
const querystring = require('querystring');
const { v4: uuid } = require('uuid');
const request = require('./requests');
const appConfig = require(path.resolve('app.config.json'));

async function processResponse(response) {
  if (!response) {
    // No response is returned
    // Due to following reason:
    // 1. Network failure/Communication failure
    // 2. Remote server does not have the resources
  } else if (!response.licenses) {
    throw new Error('license property did not exists');
  } else if (!(response.licenses instanceof Array)) {
    throw new Error('response is not a type of array');
  } else if (response.length > 100) {
    throw new Error('morethan 100 licenses found');
  } else {
    const { atlassian, tmpDirPath, removeTmpFile } = appConfig;
    const requestReceivedTracker = [];
    const id = uuid().split('-').join('');
    const tmpFilePath = path.join(tmpDirPath, id + '.json');

    await fs
      .ensureFile(tmpFilePath)
      .then(() => {
        const writeStream = fs.createWriteStream(tmpFilePath);
        writeStream.write(JSON.stringify(response, null, 2));
        writeStream.end();
        requestReceivedTracker.push({
          licenseId: response.licenses[0].licenseId,
          transaction: false,
          license: true,
          outputId: id,
        });
      })
      .then(async () => {
        const tiers = response.licenses.map((item) => item.tier);

        // Will do a loop max iteration count is 100
        // O(n)
        // const test = [];
        for (let i = 0; i < tiers.length; i++) {
          if (/^(\d+|Unlimited)\sUsers$/i.test(tiers[i])) {
            response.licenses[i].tier = convertNumUser(tiers[i]);
          } else if (/^Evaluation$/i.test(tiers[i])) {
            response.licenses[i].tier = evaluationOpportunityValue(response, i);
          } else if (/^Demonstration\sLicense$/i.test(tiers[i])) {
            response.licenses[i].tier = evaluationOpportunityValue(response, i);
          } else if (/^Subscription$/i.test(tiers[i])) {
            const URL2 = atlassian.url2.replace(
              ':vendorId',
              atlassian.vendorId
            );
            const query = {
              text: response.licenses[i].licenseId,
              addon: response.licenses[i].addonKey,
              sortBy: 'date',
              order: 'desc',
              limit: 1,
            };
            const queryParam = '?' + querystring.stringify(query);

            const id = uuid().split('-').join('');
            const tmpFilePath = path.join(tmpDirPath, id + '.json');
            const duplicateRequest = requestReceivedTracker.find(
              (entry) =>
                entry.licenseId === response.licenses[i].licenseId &&
                entry.transaction
            );
            if (!duplicateRequest) {
              const response2 = await request({
                urlPathParam: URL2,
                queryParam,
              });
              await fs
                .ensureFile(tmpFilePath)
                .then(() => {
                  const writeStream = fs.createWriteStream(tmpFilePath);
                  writeStream.write(JSON.stringify(response2 || {}, null, 2));
                  writeStream.end();

                  requestReceivedTracker.push({
                    licenseId: response.licenses[0].licenseId,
                    transaction: true,
                    license: false,
                    outputId: id,
                  });
                })
                .then(() => {
                  const subs = processSubscription(response, response2, i);
                  response.licenses[i].tier = subs;
                })
                .catch((err) => {
                  throw err;
                });
            } else {
              const filePath = path.resolve(
                tmpDirPath,
                duplicateRequest.outputId + '.json'
              );
              await fs.promises
                .readFile(filePath, 'utf-8')
                .then((data) => {
                  const response2 = JSON.parse(data);
                  const subs = processSubscription(response, response2, i);
                  response.licenses[i].tier = subs;
                })
                .catch((err) => {
                  throw err;
                });
            }
          } else {
            throw new Error('tier property value is not valid');
          }
        }
        // console.log(response)
        // return response;
      })
      .catch((err) => {
        throw err;
      });

    function processSubscription(response, response2, i) {
      if (!response2) {
        // No response is returned
        // Due to following reason:
        // 1. Network failure/Communication failure
        // 2. Remote server does not have the resources
        // No response is treated as unsucessfull

        return evaluationOpportunityValue(response, i);
      } else if (!response2.transactions) {
        // No transaction
        // because the JSON object
        // does not really contain transactions property
        // No transaction is treated as unscessfull
        return evaluationOpportunityValue(response, i);
      } else if (response2.transactions && !response2.transactions[0].length) {
        // No transaction
        // because transactions property contain
        // an empty array
        // No transaction is treated as unscessfull
        return evaluationOpportunityValue(response, i);
      } else {
        const license1 = response.licenses[i].licenseId;
        const license2 = response2.transactions[0].licenseId;
        if (license1 !== license2) {
          // mismatch result
          // mismatch result is treated as unsucessfull
          return evaluationOpportunityValue(response, i);
        } else {
          const tier = response2.transactions[0].purchaseDetails.tier;
          const extractTier = tier.match(/(\d+|Unlimited)\susers/i)[0];
          return convertNumUser(extractTier);
        }
      }
    }

    function evaluationOpportunityValue(response, i) {
      const str = response.licenses[i].evaluationOpportunitySize;
      let match = undefined;
      if (str) {
        match = str.match(/(\d+)/);
      }
      if (match) {
        return convertNumUser(match[0]);
      } else {
        return response.licenses[i].tier;
      }
    }

    function convertNumUser(string) {
      string = string.toString();
      const match = string.match(/(\d+|Unlimited)(\sUsers)?/i)[1];
      const unlimited = Boolean(match.toLowerCase() === 'unlimited');
      const int = parseInt(match);
      const num = unlimited ? 'Unlimited' : int;
      let size = undefined;
      if (num >= 1 && num <= 10) {
        size = 'S';
      } else if (num >= 11 && num <= 50) {
        size = 'M';
      } else if (num >= 51 && num <= 250) {
        size = 'L';
      } else if (num >= 251 && num <= 1250) {
        size = 'XL';
      } else if (num >= 1251 && num <= 6250) {
        size = '2XL';
      } else if (num >= 6251 || num === 'Unlimited') {
        size = '3XL';
      } else {
        throw new Error('num value is not valid');
      }
      return size;
    }

    if (removeTmpFile) {
      const jsonFile = requestReceivedTracker.map((i) => i.outputId + '.json');
      for (const json of jsonFile) {
        const tmpFilePath = path.resolve(tmpDirPath, json);
        fs.remove(tmpFilePath).catch((err) => {
          throw err;
        });
      }
    }
  }

  return response;
}

module.exports = processResponse;
