const mongoose = require("mongoose");

const transactionSchema = new mogoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    details: {
      type: String,
    },
    amount: {
      type: Number,
      default: true,
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

module.exports = mongoose.model("Transaction", transactionSchema);
