

const mongoose  = require("mongoose");
const contactModel= require("../models/contactNumber")




exports.getContactDetails = (req,res) =>{

   contactModel.find({},function (err, foundResult) {
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


exports.addContactDetails= async (req,res) => {

    const contactNumber = req.body.contactNumber;
    const data=await contactModel.find({})
    if(data.length ===0) {
        const contactDetail= new contactModel({
            _id:mongoose.Types.ObjectId(),
            contactNumber: contactNumber, 
        })

        contactDetail.save(function(err, result){
            try{
                res.json({
                    message:"contact detail  has been created successfully",
                    data: result,
                })
            }
            catch(err){
                res.json({
                    message:"Error in saving contact detail",
                    Error: err.message,
                    error: err
                })
            }
        })
        
    }else if(data.length <=1 ){
          const id=data[0]._id;
          console.log(id)
         contactModel.findOneAndUpdate({_id:id},{contactNumber:contactNumber} , {new:true} , function(err,result){
                    try{
                        if(result){
                            res.json({
                                message:"contact details added",
                                result:result
                            })
                        }else{
                            res.json("NO record")
                        }
                    }
                    catch(err){
                        res.json({
                            message:"Error occurred while adding contact details"
                        })
                    }
         })
            
        
       
    }
}

    


exports.deleteContactDetail= ( req,res) =>{

    const contactDetailId=req.params.contactDetailId;

    
    
    if(contactDetailId !==null && typeof contactDetailId !=="undefined"){
    contactModel.deleteOne({_id:contactDetailId} , function(err , result){
        
        if (!err){
            if(result.deletedCount > 0){
                res.json({
                    message:"deleted success",
                    result:result
                })
            }else{
                res.json({
                    message:"Nothing deleted , This contactDetailId  may not exist"
                })
            }
    
        }else{
            res.json({
                message: "Error occurring in deleting"
            })
        }
    })
}
    else{
    res.json("contactDetailId may be null or undefined")
   }
}

