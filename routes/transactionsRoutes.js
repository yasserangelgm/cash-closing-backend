const express = require('express');
const router = express.Router();
const transactionsControllers = require('../controllers/transactions.controller');
router
  .route('/')
  .get(transactionsControllers.getAllTransactions)
  .post(transactionsControllers.createNewTransaction)
  .patch(transactionsControllers.updateTransaction)
  .delete(transactionsControllers.deleteTransaction);

module.exports = router;
