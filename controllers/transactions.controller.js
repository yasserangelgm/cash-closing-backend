const Account = require('../models/account.model');
const Transaction = require('../models/transaction.model');
const asyncHandler = require('express-async-handler');

/* 
@desc Get all transactions
@route GET /transactions
@access Private
*/
const getAllTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find().lean();
  if (!transactions?.length) {
    return res.status(400).json({ message: 'No transactions found' });
  }
  res.json(transactions);
});

/* 
@desc Create new transaction
@route POST /transactions
@access Private
*/
const createNewTransaction = asyncHandler(async (req, res) => {
  const { transactiontype, amount, date, from, to } = req.body;

  if (!transactiontype || !amount || !date) {
    return res.status(400).json({ message: 'Some fields are required' });
  }

  if (transactiontype === 'Expense' && !from) {
    return res.status(400).json({ message: 'From field are required' });
  }
  if (transactiontype === 'Income' && !to) {
    return res.status(400).json({ message: 'To field are required' });
  }
  if (transactiontype === 'Transfer' && !from && !to) {
    return res
      .status(400)
      .json({ message: 'From and  to fields are required' });
  }

  const transaction = await Transaction.create(req.body);

  if (transaction) {
    res.status(201).json({ message: `New Transaction created` });
  } else {
    res.status(400).json({ message: 'Invalid transaction data received' });
  }
});

/*
@desc Update transaction
@route PATCH /transactions
@access Private
*/
const updateTransaction = asyncHandler(async (req, res) => {
  const { transactiontype, amount, date, from, to } = req.body;

  if (!transactiontype || !amount || !date) {
    return res.status(400).json({ message: 'Some fields are required' });
  }

  if (transactiontype === 'Expense' && !from) {
    return res.status(400).json({ message: 'From field are required' });
  }
  if (transactiontype === 'Income' && !to) {
    return res.status(400).json({ message: 'To field are required' });
  }
  if (transactiontype === 'Transfer' && !from && !to) {
    return res
      .status(400)
      .json({ message: 'From and  to fields are required' });
  }

  const transaction = await Transaction.findById(id).exec();

  if (!transaction) {
    return res.status(400).json({ message: 'Transaction not found' });
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json({
    message: `${updatedTransaction._id} has been updated`,
  });
});

/*
@desc Delete transaction
@route DELETE /transactions
@access Private
*/
const deleteTransaction = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Transaction ID is required' });
  }

  const transaction = await Transaction.findById(id).exec();

  if (!transaction) {
    return res.status(400).json({ message: 'Transaction not found' });
  }

  const result = await transaction.deleteOne();

  res.json({
    message: `Transaction with ID ${result._id} has been deleted`,
  });
});

module.exports = {
  getAllTransactions,
  createNewTransaction,
  updateTransaction,
  deleteTransaction,
};
