const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountname: {
    type: String,
    required: true,
  },
  accounttype: {
    type: String,
    required: true,
    enum: ['Efectivo', 'Banco', 'Credit'],
    default: 'Efectivo',
  },
  balance: {
    type: Number,
    required: true,
    default: 0.0,
  },
});

module.exports = mongoose.model('Account', accountSchema);
