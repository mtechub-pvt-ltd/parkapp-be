
const FindingsModel= require("../models/FindingsModel")
const mongoose  = require("mongoose");




exports.getFindings = (req,res) =>{
   FindingsModel.find({}).populate("location_id").
   exec(function (err, foundResult) {
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

exports.getAllLocIfFindingsNotExist = (req,res)=>{
    FindingsModel.find({ findings: { $exists: false } }).populate("location_id").
   exec(function (err, foundResult) {
    if(!err){
        if(foundResult!==null && typeof foundResult !=="undefined"){
            res.json({
                message:"fetched Records if saved location have findings not exists",
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

exports.getAllLocIfFindingsNotExistByUserId= (req,res)=>{
    const userId= req.params.userId;
    FindingsModel.find({ findings: { $exists: false } , userId:userId }).populate("location_id").
   exec(function (err, foundResult) {
    if(!err){
        if(foundResult!==null && typeof foundResult !=="undefined"){
            res.json({
                message:"fetched records of User if saved location have findings not exists",
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
exports.getFindingsByUserId = (req,res) =>{
    const userId = req.params.userId;
    FindingsModel.find({userId:userId}).populate("location_id").
    exec(function (err, foundResult) {
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

exports.addFindings= async (req,res) => {

    const userId = req.body.userId;
    const findings = req.body.findings;
    const location_id= req.body.location_id;
    var findingStatus ;


    if (findings){
        findingStatus=true;
    }
    
    if(location_id && userId) {

        if(findings){
            var newFindings = new FindingsModel({
                _id:mongoose.Types.ObjectId(),
                location_id:location_id,
                userId:userId,
                findings:findings,
                savedStatus:true,
                findingStatus:findingStatus
            })

         }
         else{
            var newFindings = new FindingsModel({
                _id:mongoose.Types.ObjectId(),
                location_id:location_id,
                savedStatus:true,
                userId:userId,
                findingStatus:false
            })
         }
         try{
            const savedFinding = await newFindings.save();
            if(savedFinding){
                res.json({
                    message: "findings saved successfully",
                    result:savedFinding,
                    statusCode:201
                })
            }
            else{
                res.json({
                    message: "findings could not saved successfully",
                    result:savedFinding,
                    statusCode:400
                })
            }
        }
        catch(error){
            res.json({
                message: "error occurred while saving",
                Error: error,
                errorMessage:error.message,
            })
        }
}
}

exports.deleteFindings = ( req,res) =>{

    const findingsId = req.params.findingsId ;
    
    
    if(findingsId !==null && typeof findingsId !=="undefined"){
    FindingsModel.deleteOne({_id:findingsId} , function(err , result){
        
        if (!err){
            if(result.deletedCount > 0){
                res.json({
                    message:"deleted success",
                    result:result
                })
            }else{
                res.json({
                    message:"Nothing deleted , This findingsId  may not exist"
                })
            }
    
        }else{
            res.json({
                message: "Error occurring in deleted"
            })
        }
    })
}
    else{
    res.json("findingsId may be null or undefined")
   }
}


exports.updateFindings = (req,res)=>{

    const findingsId = req.body.findingsId ;
    const userId = req.body.userId;
    const findings = req.body.findings;
    const location_id= req.body.location_id;


    if(findingsId!==null && typeof findingsId !=="undefined"){
        
        FindingsModel.findOneAndUpdate ({_id: findingsId}, 
            {
                location_id:location_id,
                userId:userId,
                findings:findings,
                
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
                            message: "couldn't update , Record with this findingsId may be not found"
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
        res.json("findingsId  may be null or undefined")
       }
}

exports.getFindingsByLocId_userId = async (req,res)=>{
    const userId= req.query.userId;
    const location_id= req.query.location_id;

    try{
        const result =await FindingsModel.findOne({userId:userId , location_id:location_id})
        if(result){
            res.json({
                message: "Finding of user for this location is:",
                result:result
            })
        }
        else{
            res.json({
                message: "could not get findings for this route",
                result:result
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while getting user findings for this location",
            Error:err,
            errorMessage: err.message
        })
    }
    


}