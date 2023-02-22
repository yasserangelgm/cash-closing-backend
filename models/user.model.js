const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      enum: ['Employee', 'Guest', 'Admin'],
      default: 'Employee',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
