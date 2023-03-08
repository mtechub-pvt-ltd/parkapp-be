const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  token: {
    type: String,
  },
});

const User = mongoose.model("user", schema);

module.exports = User;