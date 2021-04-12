'use strict';

const fs = require('fs-extra');
const path = require('path');
const moment = require('moment-timezone');
const appConfig = require(path.resolve('app.config.json'));

function log(req, res, next) {
  const logsFolder = appConfig.logsDirName;
  const logFileName = appConfig.accessLogFileName;
  const logFilePath = path.resolve(logsFolder, logFileName);

  console.log(moment.utc().utcOffset(0).toString());
  const timestamp = moment.utc().utcOffset(0).toString();
  const forward = 'forward=' + req.ip;
  const method = 'method=' + req.method;
  const protocol = 'protocol=' + req.protocol;
  const host = 'host=' + req.hostname;
  const requestpath = `path="${req.originalUrl}"`;
  const pid = 'pid=' + process.pid;
  const data = `${timestamp} ${pid} ${forward} ${method} ${protocol} ${host} ${requestpath}`;
  fs.ensureFile(logFilePath)
    .then(() => {
      fs.appendFile(logFilePath, data + '\r\n', 'utf-8');
    })
    .catch(() => {
      // do nothing ignore any error
    });
  next();
}

module.exports = log;
