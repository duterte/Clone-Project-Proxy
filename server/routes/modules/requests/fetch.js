'use strict';

require('dotenv').config();
const path = require('path');
const fetch = require('node-fetch');
const appConfig = require(path.resolve('app.config.json'));

async function makeFetchRequest(object) {
  const { urlPathParam = '/', queryParam = '' } = object;
  const selectDNS =
    process.env.NODE_ENV === 'production'
      ? appConfig.atlassian.remoteDNS
      : appConfig.atlassian.localDNS;

  const domain = selectDNS || 'http://localhost:5000';
  const url = domain + urlPathParam + queryParam;
  const email = process.env.atlassian_email || 'not_exist@email.com';
  const apiToken = process.env.atlassian_apiToken || 'wrongApiToken';
  const atlassianAuth = `${email}:${apiToken}`;

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(atlassianAuth)}`,
      Accept: 'application/json',
    },
  };

  return fetch(url, options)
    .then((res) => checkStatus(res))
    .catch((err) => {
      return undefined;
    });

  function checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  }
}

module.exports = makeFetchRequest;
