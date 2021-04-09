'use strict';

const fs = require('fs-extra');
const path = require('path');
const { v4: uuid } = require('uuid');
const appConfig = require(path.resolve('app.config.json'));

const requests = require('requests');
const domain = appConfig.atlassian.remoteDNS || 'http://localhost:5000';
const urlPathParam = process.argv[2] || '/';
const query = process.argv[3] || '';
const url = domain + urlPathParam + query;

const tmpDirPath = appConfig.tmpDirPath;
const id = uuid().split('-').join('');
const tmpFilePath = path.join(tmpDirPath, id + '.json');

fs.ensureFileSync(tmpFilePath);

const writeStream = fs.createWriteStream(tmpFilePath);
const request = requests(url, { streaming: true });

request.on('data', (chunk) => {
  writeStream.write(chunk);
});

request.on('end', (err) => {
  if (err) console.log(err);
  else {
    writeStream.end();
    console.log(id);
  }
});
