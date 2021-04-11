'use strict';

const root = require('./root');

module.exports = {
  '/': root,
  index: {
    url: '/index',
    route: root.route,
  },
  'index.html': {
    url: '/index.html',
    route: root.route,
  },
  'index.php': {
    url: '/index.php',
    route: root.route,
  },
  'index.asp': {
    url: '/index.asp',
    route: root.route,
  },
  rest: require('./rest'),
  query: require('./query'),
};
