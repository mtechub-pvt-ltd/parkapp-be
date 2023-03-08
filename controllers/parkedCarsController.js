

const parkedCarsModel= require("../models/parkedCarsModel")
const mongoose  = require("mongoose");
const { castObject } = require("../models/locationsModel");
const locationModel = require("../models/locationsModel")


exports.getParkedCars = (req,res) =>{

    parkedCarsModel.find({}).populate("parking_id").
    exec(function(err, result){
        try{
            res.json({
                message: "All fetched parking history is:",
                data: result
            })
        }
        catch(err){
            res.json({
                message: "Error in fetching",
                Error: err.message,
                error: err
            })
        }

    })
}

exports.getOnlyParkedCars = (req,res) =>{

    parkedCarsModel.find({isParked:true}).populate("parking_id").
    exec(function(err, result){
        try{
            res.json({
                message: "All Current parked Cars with Locations and Details:",
                data: result
            })
        }
        catch(err){
            res.json({
                message: "Error in Fetching Parked cars",
                Error: err.message,
                error: err
            })
        }

    })
}

exports.getParkedCarsByUserId= (req,res) =>{
    const userId = req.params.userId

    if(userId !==null && typeof userId !=="undefined" ){
        parkedCarsModel.findOne({userId:userId , isParked:true}).populate("parking_id").
        exec(function(err, result){
            try{
                if(result){
                    res.json({
                        message: "parking of this user is:",
                        data: result
                    })
                }
                else{
                    res.json({
                        message: "Not found any current parking for this user",
                        success:false
                    })
                }
                
            }
            catch(err){
                res.json({
                    message: "Error in fetched parked Cars",
                    Error: err.message,
                    error: err
                })
            }
    
        })
    }
    else{
        res.json("user ID may be null or undefined")
    }
    
}


exports.parkCar= async(req,res) => {

    const parkTime = req.body.parkTime;
    const plateNumber = req.body.plateNumber;
    const lane_number = req.body.lane_number;
    const parkingDetails = req.body.parkDetails;
    const userId = req.body.userId;
    const parking_id = req.body.parking_id;
    const totalParkingTime= req.body.totalParkingTime;
    const unParkTime = req.body.unParkTime;
    const carColor = req.body.carColor;


    const isParked = await parkedCarsModel.findOne({userId: userId , isParked:true}).populate("parking_id")
    if(isParked){
        res.json({
            message: "User has already parked its vehicle , to add new parking please unpark previous vehicle first",
            parkingDetails:isParked,
            success:false
        })
    }
    else{   
        if(parking_id){
            const park= new parkedCarsModel({
                _id:mongoose.Types.ObjectId(),
                userId:userId,
                parking_details:parkingDetails,
                parking_id:parking_id,
                parkTime:parkTime,
                lane_number:lane_number,
                totalParkingTime:totalParkingTime,
                carColor:carColor,
                unParkTime:unParkTime,
                plateNumber:plateNumber,
            })
            park.save(function(err, result){
               
                try{
                    res.json({
                        message:"vehicle parking successfully saved",
                        data: result,
                    })
                }
                catch(err){
                    res.json({
                        message:"Error in saving vehicle Parking",
                        Error: err.message,
                        error: err
                    })
                }
            })
        }
        else{
            res.json({
                message: "parking id my be null or undefined",
            })
        }

    }
}

exports.deleteParkings = ( req,res) =>{
    const parkingId = req.params.parkingId ;
    
    if(parkingId !==null && typeof parkingId !=="undefined"){
    parkedCarsModel.deleteOne({_id:parkingId} , function(err , result){
        if (!err){
            res.json(result)
        }else{
            res.json(err)
        }
    })
}
    else{
    res.json("parkingId may be null or undefined")
   }
}


exports.unPark= (req,res)=>{

    const parkingId = req.body.parkingId;
    const unParkTime = req.body.unParkTime;
    const totalParkingTime=req.body.totalParkingTime;
    

    if(parkingId!==null && typeof parkingId !=="undefined"){
        
        parkedCarsModel.findOneAndUpdate ({_id: parkingId}, 
            {
                isParked: false,
                unParkTime: unParkTime,
                totalParkingTime: totalParkingTime
            },
            {
                new: true,
            }, function(err, result) {
                if(!err){
                    if(result!==null && typeof result !=="undefined"){
                        res.json({
                            message: "parking status and unPark time Updated successfully",
                            updatedResult: result
                        })
                    }else{
                        res.json({
                            message: "couldn't update , Record with this parking id may be not found"
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
        res.json("parkingId  may be null or undefined")
       }
}
 
exports.updateParking = (req,res)=>{
    const parkingId = req.body.parkingId;
    const parkTime = req.body.parkTime;
    const plateNumber = req.body.plateNumber;
    const lane_number = req.body.lane_number;
    const parkingDetails = req.body.parkDetails;
    const userId = req.body.userId;
    const parking_id = req.body.parking_id;
    const totalParkingTime= req.body.totalParkingTime;
    const unParkTime = req.body.unParkTime;
    const carColor = req.body.carColor;

    parkedCarsModel.findOneAndUpdate({_id:parkingId}
        ,
        {
            userId:userId,
            parking_details:parkingDetails,
            parking_id:parking_id,
            parkTime:parkTime,
            lane_number:lane_number,
            totalParkingTime:totalParkingTime,
            carColor:carColor,
            unParkTime:unParkTime,
            plateNumber:plateNumber,
        },
        {
            new: true
        }, function(err,result){
            try{
                if(result){
                    res.json({
                        message: " parking has been updated successfully",
                        statusCode: 200,
                        result: result

                    })
                }
                else{
                    res.json({
                        message: "Could not update parking ",
                        statusCode: 404,
                    })
                }
            }
            catch(err){
                res.json({
                    message: "Error occurred while updating parking",
                    Error:err,
                    errorMessage: err.message,
                })
            }
        }
        )
}


exports.getParkingCount = async (req,res)=>{
    try{
        const result = await parkedCarsModel.count();

        if(result){
            res.json({
                message: "parking count ",
                count: result,
                status:true
            })
        }
        else{
            res.json({
                message: "could not fetch count",
                status:false
            })
        }
    }
    catch(err){
        res.json({
            message : "Error Occurred",
            error:err.message,
            status: false
        })
    }
}


exports.getParkedVehicles_in_parking = async (req,res)=>{
    try{
        const parking_id = req.query.parking_id ;

        if(!parking_id){
            return(
                res.json({
                    message: "please provide parking_id",
                    status:false
                })
            )
        }
        
        const result = await parkedCarsModel.find({parking_id : parking_id});
        let count = 0 ;
        let parkedCount;
        let leftSpace ;

        if(result){
            const parking =  await locationModel.findOne({_id:parking_id});
            if(parking.parking_capacity){
                count = parking.parking_capacity;
            }
        }

        if(result){
            parkedCount = result.length;
            leftSpace = parseInt(count) - parseInt(parkedCount) 
            
        }

        if(result){
            res.json({
                message : "Total parked cars in this parking area",
                parking_capacity : count,
                leftSpace: leftSpace,
                total_parked_vehicles : parkedCount,
                status: true,
                result:result
            })
        }
        else{
            res.json({
                message : "Could not fetche",
                status: false
            })
        }

    }
    catch(err){
        res.json({
            message : "Error Occurred",
            error:err.message,
            status: false
        })
    }
}