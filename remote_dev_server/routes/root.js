const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const query = req.query;
  return res.json(query);
});

module.exports = {
  url: '/',
  route: router,
};
