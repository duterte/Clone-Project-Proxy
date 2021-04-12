'use strict';

//  This from main server app

const path = require('path');
const querystring = require('querystring');

const express = require('express');
const { request, processResponse, authenticate } = require('./modules');
const appConfig = require(path.resolve('app.config.json'));

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const { atlassian } = appConfig;
    const URL1 = atlassian.url1.replace(':vendorId', atlassian.vendorId);

    // Add param "withDataInsights=true" to parameters list (or replace it if already exists)

    const query = { ...req.query, withDataInsights: true };

    // If param "tier" or "withAttribution" specified, stop work and return an error

    if (req.query.tier) {
      const error = new Error('tier query parameter should not be specified');
      error.code = 400;
      throw error;
    }
    if (req.query.withAttribution) {
      const error = new Error('withAttribution should not be specified');
      error.code = 400;
      throw error;
    }

    const queryParam = '?' + querystring.stringify(query);
    const response = await request({ urlPathParam: URL1, queryParam });
    let process = await processResponse(response);
    const acceptType = req.headers.accept.split(',')[0];

    if (!process) process = `${process}`;
    if (acceptType === 'application/json') {
      return res.status(200).json(process);
    } else {
      return res
        .status(200)
        .contentType('text/plain')
        .send(JSON.stringify(process, null, 2));
    }
  } catch (err) {
    console.log(err);
    if (err.code === 400) {
      return res.status(400).json(`Bad Request: ${err.message}`);
    } else {
      return res.status(500).json('Uncaught error occur in the server');
    }
  }
});

module.exports = {
  url: '/query',
  route: router,
};
