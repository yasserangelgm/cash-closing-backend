const express = require('express');
const router = express.Router();
const transactionsControllers = require('../controllers/transactions.controller');
router
  .route('/')
  .get(transactionsControllers.getAllAccounts)
  .post(transactionsControllers.createNewAccount)
  .patch(transactionsControllers.updateAccount)
  .delete(transactionsControllers.deleteAccount);

module.exports = router;
