'use stritct';

const fs = require('fs');
const path = require('path');

module.exports = (() => {
  const list = {};
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
    if (file === 'index.js') continue;
    list[file] = require(`./${file}`);
  }
  return list;
})();
