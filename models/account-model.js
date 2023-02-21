const mogoose = require("mogoose");
const { default: mongoose } = require("mongoose");

const accountSchema = new mogoose.Schema({
  accountname: {
    type: String,
    required: true,
  },
  accounttype: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: true,
  },
});

module.exports = mongoose.model("Account", accountSchema);
