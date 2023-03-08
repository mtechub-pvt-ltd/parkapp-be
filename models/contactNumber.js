
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
  contactNumber:String
})
module.exports = mongoose.model("contact", contactSchema);