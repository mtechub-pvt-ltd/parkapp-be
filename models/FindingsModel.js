const mongoose = require("mongoose");

const findingsSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
   userId : mongoose.Schema.Types.ObjectId,
   findings: String,
   location_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "location"
   },
   findingStatus:Boolean,
   savedStatus:Boolean,
});

const findingModel = mongoose.model("finding", findingsSchema);
module.exports = findingModel;