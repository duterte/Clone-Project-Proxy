'use strict';

const fs = require('fs-extra');
const path = require('path');
const moment = require('moment-timezone');
const { v4: uuid } = require('uuid');
const appConfig = require(path.resolve('app.config.json'));

function log(req, res, next) {
  const logsFolder = appConfig.logsDirName;
  const logFileName = appConfig.accessLogFileName;
  const logFilePath = path.resolve(logsFolder, logFileName);
  const timestamp = moment.utc().utcOffset(0).toString();
  const forward = 'forward=' + req.ip;
  const method = 'method=' + req.method;
  const protocol = 'protocol=' + req.protocol;
  const host = 'host=' + req.hostname;
  const requestpath = `path="${req.originalUrl}"`;
  const pid = 'pid=' + process.pid;
  const requestId = uuid();
  const referenceId = `referenceId=` + requestId;
  req.referenceId = requestId;

  let auth = 'auth=false';
  const authentication = req.authentication;
  if (authentication && authentication.userExist && authentication.pwdMatch) {
    auth = `auth=true user=${authentication.username}`;
  }
  const data = `${timestamp} ${pid} ${forward} ${auth} ${method} ${protocol} ${host} ${requestpath} ${referenceId}`;

  fs.ensureFile(logFilePath)
    .then(() => fs.appendFile(logFilePath, data + '\r\n', 'utf-8'))
    .catch(() => '');
  next();
}

module.exports = log;
