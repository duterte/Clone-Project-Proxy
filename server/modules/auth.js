'use strict';

const path = require('path');

function auth(req, res, next) {
  if (req.headers['authorization']) {
    const { users } = require(path.resolve('local_db'));
    const authorization = req.headers['authorization'].split(' ')[1];
    const username = authorization.split(':')[0];
    const password = authorization.split(':')[1];
    if (!username) next();
    const findUser = users.find((i) => i.username === username);
    let pwdMatch = false;
    req.authentication = {};
    if (findUser) {
      pwdMatch = Boolean(findUser.password === password);
    }
    req.authentication = {
      userExist: Boolean(findUser),
      pwdMatch,
      username: findUser.username,
      password: findUser.password,
    };
  }
  next();
}

module.exports = auth;
