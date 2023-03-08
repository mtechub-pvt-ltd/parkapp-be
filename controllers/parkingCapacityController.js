
const parkingCapacityModel= require("../models/parkingCapacityModel")
const mongoose  = require("mongoose");


exports.parkingCapacity = (req,res) =>{

   parkingCapacityModel.find({},function (err, foundResult) {
    if(!err){
        if(foundResult!==null && typeof foundResult !=="undefined"){
            res.json({
                message:"fetched Records",
                result:foundResult
            })
        }else{
            res.json({
                message: "Result is null"
            })
        }
    }else{
        res.json({message: "Result is not found",
                Error: err.message
    })
    }

});
}



exports.addCapacity = (req,res)=>{

    const capacity = req.body.capacity;
    
    parkingCapacityModel.findOne({} , (err , result)=>{
        
        if(result!==null){
            const id= result._id;
            parkingCapacityModel.findOneAndUpdate ({_id: id}, 
                {
                    
                    capacity: capacity,
                },
                {
                    new: true,
                }, function(err, result) {
                    if(!err){
                        if(result!==null && typeof result !=="undefined"){
                            res.json({
                                message: "Updated successfully",
                                updatedResult: result
                            })
                        }else{
                            res.json({
                                message: "couldn't update , Record with this id may be not found"
                            })
                        }
                       
                    }
                    else{
                        res.json({
                            message: "Error updating",
                            Error: err.message,
                        })
                    }
                   
                })
    }
    else{
        console.log("in else")
        const newParking= new parkingCapacityModel({
            _id:mongoose.Types.ObjectId(),
            capacity:capacity,
        })
        newParking.save(function(err){
            if(!err){
                res.json({
                    message: "parking Capacity has been defined",
                    status: "success",
                })
            }
            else{
                res.json({
                    message: "parking Capacity has not been defined",
                })
            }
        })
        
    }
   

    })
}
