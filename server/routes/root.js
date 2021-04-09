'use strict';

//  This from main server app

const path = require('path');
const querystring = require('querystring');

const express = require('express');
const { request, processResponse } = require('./modules');
// const { execFile } = require('child_process');
const appConfig = require(path.resolve('app.config.json'));

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { atlassian } = appConfig;
    const URL1 = atlassian.url1.replace(':vendorId', atlassian.vendorId);

    // Add param "withDataInsights=true" to parameters list (or replace it if already exists)

    const query = { ...req.query, withDataInsights: true };

    // If param "tier" or "withAttribution" specified, stop work and return an error

    if (req.query.tier) {
      throw new Error('tier query parameter was specified');
    }
    if (req.query.withAttribution) {
      throw new Error('withAttribution query parameter was specified');
    }

    const queryParam = '?' + querystring.stringify(query);
    const response = await request({ urlPathParam: URL1, queryParam });
    await processResponse(response);
    return res.json('Working !!!');
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
});

module.exports = {
  url: '/',
  route: router,
};
