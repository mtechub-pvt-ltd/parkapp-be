

const mongoose= require('mongoose');  

const parkedCarsSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    parking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "location"
    },
    isParked : {
      type:Boolean,
      default:true
    },
    parkTime : {
            type: Date,
            
          },
    unParkTime: {
        type: Date,
        
      },
    totalParkingTime:{
        type:String,
    },
      plateNumber: {
        type:String,
      }, 
      lane_number : Number,
      parking_details:String,
      carColor: String,
    
})

parkedCarsSchema.index({location:"2dsphere"});
module.exports = mongoose.model("userParking" , parkedCarsSchema);