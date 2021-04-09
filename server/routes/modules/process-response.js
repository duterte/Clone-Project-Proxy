'use strict';

const fs = require('fs-extra');
const path = require('path');
const { v4: uuid } = require('uuid');
const request = require('./requests');
const appConfig = require(path.resolve('app.config.json'));

async function processResponse(response) {
  if (!response.licenses) {
    throw new Error('license property did not exists');
  } else if (!(response.licenses instanceof Array)) {
    throw new Error('response is not a type of array');
  } else if (response.length > 100) {
    throw new Error('morethan 100 licenses found');
  } else {
    const { atlassian, tmpDirPath } = appConfig;

    const id = uuid().split('-').join('');
    const tmpFilePath = path.join(tmpDirPath, id + '.json');
    await fs
      .ensureFile(tmpFilePath)
      .then(() => {
        const writeStream = fs.createWriteStream(tmpFilePath);
        writeStream.write(JSON.stringify(response, null, 2));
        writeStream.end();
      })
      .then(async () => {
        const tiers = response.licenses.map((item) => item.tier);

        for (let i = 0; i < tiers.length; i++) {
          if (/^(\d+|Unlimited)\sUsers$/.test(tiers[i])) {
            response.licenses[i].tier = convertNumUser(tiers[i]);
          } else if (/^Evaluation$/.test(tiers[i])) {
            // response.licenses[i].evaluationOpportunitySize
            // processEvaluation()
          } else if (/^Demonstration\sLicense$/.test(tiers[i])) {
            //
            //
            //
          } else if (/^Subscription$/.test(tiers[i])) {
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
            const response = await request({ urlPathParam: URL2, queryParam });
            //
            //
            //
          } else {
            throw new Error('value of tier property is unrecognized');
          }
        }
      })
      .catch((err) => {
        throw err;
      });

    function convertNumUser(string) {
      const num =
        string.split(' ')[0] === NaN
          ? string.split(' ')[0].toLowerCase() === 'unlimited'
            ? 'Unlimited'
            : undefined
          : Number(string.split(' ')[0]);

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
  }
}

module.exports = processResponse;
