'use stritct';

const fs = require('fs');
const path = require('path');

module.exports = (() => {
  const collection = [];
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
    if (file === 'index.js') continue;
    collection.push(require(`./${file}`));
  }
  return collection;
})();
