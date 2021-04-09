const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.json('Working !!!');
});

module.exports = {
  url: '/',
  route: router,
};
