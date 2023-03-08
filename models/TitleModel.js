const mongoose = require("mongoose");

const TitleSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
   title: String,
   description: String
});

const titleModel = mongoose.model("Title", TitleSchema);

module.exports = titleModel;