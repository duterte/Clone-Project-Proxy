'use strict';

require('dotenv').config();
const express = require('express');
const modules = require('./modules');
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
  app.disable('x-powered-by');
  app.set('view engine', 'ejs');
  app.set('trust proxy', true);
  app.use(express.json());
  modules.routes(express, app);
}
