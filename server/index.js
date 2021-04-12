'use strict';

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const { routes, auth, log } = require('./modules');
const cluster = require('cluster');
const cpus = require('os').cpus().length;
const app = express();
const PORT = process.env.PORT || 3000;

if (cluster.isMaster && process.env.NODE_ENV === 'production') {
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  cluster.on('exit', () => {
    console.log('cluster restarting');
    cluster.fork();
  });
} else {
  app.listen(PORT, () => console.log('server is running @ PORT ' + PORT));
  app.use(helmet());
  app.disable('x-powered-by');
  app.set('view engine', 'ejs');
  app.use(express.json());
  app.use(auth);
  app.use(log);
  routes(express, app);
}
