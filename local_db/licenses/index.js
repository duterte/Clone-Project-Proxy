const A_license_tier_size_specified = require('./1_A_license_tier_size_specified');
const A_license_evaluation_no_tier = require('./2_A_license_evaluation_no_tier');
const A_license_no_opportunity = require('./3_A_license_no_opportunity');
const B_no_transaction = require('./3_B_no_transaction');
const A_two_licenses_found = require('./4_A_two_licenses_found');
const B_2nd_transaction = require('./4_B_2nd_transaction');

const DB = {};
DB.licenses = [];
DB.transactions = [];

DB.licenses.push(A_license_tier_size_specified);
DB.licenses.push(A_license_evaluation_no_tier);
DB.licenses.push(A_license_no_opportunity);
DB.transactions.push(B_no_transaction);
DB.licenses.push(A_two_licenses_found);
DB.transactions.push(B_2nd_transaction);

module.exports = DB;
