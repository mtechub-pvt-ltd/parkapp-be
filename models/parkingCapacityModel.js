const mongoose = require("mongoose");

const parkingCapacitySchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
   capacity: String,
});

const parkingCapacityModel = mongoose.model("parkingCapacitySchema", parkingCapacitySchema);

module.exports = parkingCapacityModel;