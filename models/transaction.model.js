const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    transactiontype: {
      type: String,
      required: true,
      enum: ['Expense', 'Income', 'Transfer'],
      default: 'Expense',
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    details: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
