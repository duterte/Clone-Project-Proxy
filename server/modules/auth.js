'use strict';

const path = require('path');

function auth(req, res, next) {
  if (req.headers['authorization']) {
    const { users } = require(path.resolve('local_db'));

    // When authorization header send by the browser encode it into base64
    // Then the server should decode base64 string in order to use it
    // express automatically decode base64
    const [username, password] = req.headers['authorization']
      .split(' ')[1]
      .split(':');

    const restUrl = {
      url: /^\/rest/.test(req.url),
      baseUrl: /^\/rest/.test(req.baseUrl),
    };
    if (restUrl.url || restUrl.baserUrl) {
      req.authentication = {
        userExist: true,
        pwdMatch: true,
        username: username,
        password: password,
      };
    } else {
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
  }
  next();
}

module.exports = auth;
