const express = require('express');
const router = express.Router();
const accountsControllers = require('../controllers/accounts.controller');
router
  .route('/')
  .get(accountsControllers.getAllAccounts)
  .post(accountsControllers.createNewAccount)
  .patch(accountsControllers.updateAccount)
  .delete(accountsControllers.deleteAccount);

module.exports = router;
