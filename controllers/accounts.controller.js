const Account = require('../models/account.model');
const Transaction = require('../models/transaction.model');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

/* 
@desc Get all accounts
@route GET /accounts
@access Private
*/
const getAllAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find().lean();
  if (!accounts?.length) {
    return res.status(400).json({ message: 'No accounts found' });
  }
  res.json(accounts);
});

/* 
@desc Create new account
@route POST /accounts
@access Private
*/
const createNewAccount = asyncHandler(async (req, res) => {
  const { accountname, accounttype, balance } = req.body;

  console.log(parseFloat(balance) >= 0);

  if (!accountname || !accounttype || !(parseFloat(balance) >= 0)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const duplicate = await Account.findOne({ accountname }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate account name' });
  }

  const accountObject = { accountname, accounttype, balance };
  const account = await Account.create(accountObject);

  if (account) {
    res.status(201).json({ message: `New Account ${accountname} created` });
  } else {
    res.status(400).json({ message: 'Invalid account data received' });
  }
});

/*
@desc Update account
@route PATCH /accounts
@access Private
*/
const updateAccount = asyncHandler(async (req, res) => {
  const { id, accountname, accounttype, balance } = req.body;

  if (!id || !accountname || !accounttype || !balance) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const account = await Account.findById(id).exec();

  if (!account) {
    return res.status(400).json({ message: 'Account not found' });
  }

  const duplicate = await Account.findOne({ accountname }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate account name' });
  }

  account.accountname = accountname;
  account.accounttype = accounttype;
  account.balance = balance;

  const updatedAccount = await account.save();

  res.json({ message: `${updatedAccount.accountname} has been updated` });
});

/*
@desc Delete account
@route DELETE /accounts
@access Private
*/
const deleteAccount = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Account ID is required' });
  }

  const account = await Account.findById(id).exec();

  if (!account) {
    return res.status(400).json({ message: 'Account not found' });
  }

  const transactions = await Transaction.find({
    $or: [{ from: id }, { to: id }],
  })
    .lean()
    .exec();
  if (transactions?.length) {
    return res
      .status(400)
      .json({ message: 'There transactions with this account' });
  }

  const result = await account.deleteOne();
  console.log(result);
  res.json({
    message: `Account ${result.accountname} with ID ${result._id} has been deleted`,
  });
});

module.exports = {
  getAllAccounts,
  createNewAccount,
  updateAccount,
  deleteAccount,
};
