
const locationModel= require("../models/locationsModel")
const mongoose  = require("mongoose");
const cloudinary = require("../utils/cloudinary")


exports.getLocations = (req,res) =>{

    locationModel.find({}, (err , result)=>{
        try{
            res.json({
                message: "All fetched locations are :",
                data: result
            })
        }
        catch(err){
            res.json({
                message: "Error in fetched location",
                Error: err.message,
                error: err
            })
        }

    })
}
exports.getAllLocationsWithOnePic = (req,res) =>{

    locationModel.find({}, {images:{$slice:1}} , (err , result)=>{
        try{
            res.json({
                message: "All fetched locations are :",
                data: result
            })
        }
        catch(err){
            res.json({
                message: "Error in fetched location",
                Error: err.message,
                error: err
            })
        }

    })
}
exports .getLocationByType = (req,res)=>{
    const type= req.query.type

    locationModel.find({type:type}, function(err,result){
        try{
            if(result){
                res.json({
                    message: "Locations with this types are fetched",
                    statusCode: 200,
                    result: result
                })
            }
            else{
                res.json({
                    message: "could not fetched , record with this type may not exist",
                    statusCode:404,
                })
            }
        }
        catch(err){
            res.json({
                message: "Error occurred while fetching location .",
                Error:err,
                errorMessage: err.message,
            })
        }
    })
}
exports .getLocationByTypeWithOnePic = (req,res)=>{
    const type= req.query.type

    locationModel.find({type:type} , {images:{$slice:1}}, function(err,result){
        try{
            if(result){
                res.json({
                    message: "Locations with this types are fetched",
                    statusCode: 200,
                    result: result
                })
            }
            else{
                res.json({
                    message: "could not fetched , record with this type may not exist",
                    statusCode:404,
                })
            }
        }
        catch(err){
            res.json({
                message: "Error occurred while fetching location .",
                Error:err,
                errorMessage: err.message,
            })
        }
    })
}
exports.getLocationById = (req,res)=>{
    const location_id = req.params .location_id;
    locationModel.findOne({_id:location_id}, (err , result)=>{
        try{
            res.json({
                message: "location fetched:",
                data: result
            })
        }
        catch(err){
            res.json({
                message: "Error in fetched location",
                Error: err.message,
                error: err
            })
        }

    })
}
exports.createLocations=async (req,res) => {

    const type= req.body.type;
    const title = req.body.title;
    const description = req.body.description;
    const distance = req.body.distance;
    const avg_time = req.body.avg_time;
    const location = req.body.location;
    const parking_capacity = req.body.parking_capacity;

    if(type == 'parking'){
        if(!parking_capacity){
            return(
                res.json({
                    message: "If type is parking then please provide parking_capacity",
                    status: false
                })
            )
            
        }
    }
    if(type != 'parking'){
        if(parking_capacity){
            return(
                res.json({
                    message: "Dont provide parking capacity , parking capacity is only applicable when type is parking",
                    status: false
                })
            )
        }
    }
    console.log(type)
    console.log(location)

    console.log(req.files)

        try{
            var pathsArray = [];
    
            for (const file of req.files){
                const {path}= file
                const c_result = await cloudinary.uploader.upload(path)
                 pathsArray.push({
                   image_url: c_result.secure_url,
                    public_id:c_result.public_id
                 })
    
            }
            console.log(pathsArray)
    
                const newLocation= new locationModel({
                    _id:mongoose.Types.ObjectId(),
                     type: type,
                     images:pathsArray,
                     title:title,
                     description:description,
                     distance:distance,
                     avg_time:avg_time,
                     location:JSON.parse(location),
                     parking_capacity: parking_capacity
                })
                newLocation.save(function(err, result){
                    console.log(result)
                        res.json({
                            message:"location successfully saveddd",
                            result:result,
                            statusCode:201
                        })
                })
            
            }
            catch(err){
            res.json(err)
        }
 
    
}


exports.deleteLocation = async( req,res) =>{

    const location_id = req.params.location_id ;
    try{
        const result= await locationModel.findOne({_id:location_id});
     if(result){
        let imagesArray = result.postImages;
        imagesArray.forEach(element => {
            cloudinary.uploader.destroy(element.public_id)
        });
   }
   else{
    console.log("location with this id not found")
   }
    }
    catch(err){
        console.log(err)
    }
    

    if(location_id !==null && typeof location_id !=="undefined"){
    locationModel.deleteOne({_id:location_id} , function(err , result){
        try{
            if(result.deletedCount > 0){
                res.json({
                    message:"deleted successfully",
                    result:result,
                    statusCode:200
                })
            }
            else{
                res.json({
                    message: "could not delete location , location_id may be null or undefined"
                })
            }
        }
        catch(err){
            res.json({
                message: "Error occurred while deleting location",
                statusCode:404,
                Error:err,
                errorMessage: err.message
            })
        }
})
}
}


exports.updateLocation =async (req,res)=>{

    const location_id = req.body.location_id;
    const type= req.body.type;
    const title = req.body.title;
    const description = req.body.description;
    const distance = req.body.distance;
    const avg_time = req.body.avg_time;

    if(req.files){
        try{
            const result= await locationModel.findOne({_id:location_id});
         if(result){
            let imagesArray = result.postImages;
            imagesArray.forEach(element => {
                cloudinary.uploader.destroy(element.public_id)
            });
       }
       else{
        console.log("location with this id not found")
       }
        }
        catch(err){
            console.log(err)
        }
       
    }
    

    var pathsArray = [];
    for (const file of req.files){
        const {path}= file
        const c_result = await cloudinary.uploader.upload(path)
         pathsArray.push({
           image_url: c_result.secure_url,
            public_id:c_result.public_id
         })

    }
    console.log(pathsArray)
    

    if(location_id){
        locationModel.findOneAndUpdate ({_id: location_id}, 
            {
                type: type,
                images:pathsArray,
                title:title,
                description:description,
                distance:distance,
                avg_time:avg_time,
                $set: {
                    "location.coordinates": [req.body.long, req.body.lat],
                  },
            },
            {
                new: true,
            }, function(err, result) {
                try{
                    if(result){
                        res.json({
                            message: "location updated successfully",
                            result:result,
                            statusCode:201
                        })
                    }
                    else{
                        res.json({
                            message: "could not update location , location with this id may not exist",
                            
                        })
                    }
                }
                catch(err){
                    res.json({
                        message: "Error updating location",
                        errorMessage: err.message,
                        statusCode:500
                    })
                }
            })
    }
        else{
        res.json("location_id may be null or undefined")
       }
}
