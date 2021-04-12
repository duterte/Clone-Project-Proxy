'use strict';

const path = require('path');

function auth(req, res, next) {
  if (req.headers['authorization']) {
    const { user } = require(path.resolve('local_db'));
    const authorization = req.headers['authorization'].split(' ')[1];
    const username = authorization.split(':')[0];
    const password = authorization.split(':')[1];
    const findUser = user.find((i) => i.username === username);
    let pwdMatch = false;
    if (findUser) pwdMatch = Boolean(findUser.password === password);
    req.authentication = { userExist: Boolean(findUser), pwdMatch };
  }
  next();
}

module.exports = auth;
