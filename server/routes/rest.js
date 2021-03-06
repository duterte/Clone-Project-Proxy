const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/2/vendors/:vendorId/reporting/licenses', (req, res) => {
  const { licenses: local_db } = require(path.resolve('local_db'));
  const filter = local_db.licenses.filter((item1) => {
    if (item1.licenses) {
      return item1.licenses.filter((item2) => {
        if (item2.licenseId === req.query.text) {
          return true;
        } else {
          return false;
        }
      }).length;
    } else {
      return false;
    }
  });

  return res.json(filter[0]);
});

router.get('/2/vendors/:vendorId/reporting/sales/transactions', (req, res) => {
  const { licenses: local_db } = require(path.resolve('local_db'));
  const filter = local_db.transactions.filter((item1) => {
    if (item1.transactions) {
      return item1.transactions.filter((item2) => {
        if (item2.licenseId === req.query.text) {
          return true;
        } else {
          return false;
        }
      }).length;
    } else {
      return false;
    }
  });
  return res.json(filter[0]);
});

module.exports = {
  url: '/rest',
  route: router,
};
