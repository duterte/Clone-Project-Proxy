'use strict';

const fetch = require('node-fetch');
const path = require('path');
const appConfig = require(path.resolve('app.config.json'));

async function makeFetchRequest(object) {
  const { urlPathParam = '/', queryParam = '' } = object;
  const domain = appConfig.atlassian.remoteDNS || 'http://localhost:5000';
  const url = domain + urlPathParam + queryParam;

  const options = {
    method: 'GET',
    Accept: 'application/json',
  };

  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => {
      return undefined;
    });
}

module.exports = makeFetchRequest;
