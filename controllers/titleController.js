
const titleModel= require("../models/TitleModel")
const mongoose  = require("mongoose");




exports.getTitles = (req,res) =>{

   titleModel.find({},function (err, foundResult) {
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


exports.addTitle= (req,res) => {

    const title = req.body.title;
    const description = req.body.description;
   

        const newTitle= new titleModel({
            _id:mongoose.Types.ObjectId(),
            title: title,
            description:description, 
        })

        newTitle.save(function(err, result){
            try{
                res.json({
                    message:"title has been created successfully",
                    data: result,
                })
            }
            catch(err){
                res.json({
                    message:"Error in saving title",
                    Error: err.message,
                    error: err
                })
            }
        })
    
    
    }

    


exports.deleteTitle= ( req,res) =>{

    const titleId = req.params.titleId ;
    
    
    if(titleId !==null && typeof titleId !=="undefined"){
    titleModel.deleteOne({_id:titleId} , function(err , result){
        
        if (!err){
            if(result.deletedCount > 0){
                res.json({
                    message:"deleted success",
                    result:result
                })
            }else{
                res.json({
                    message:"Nothing deleted , This titleId  may not exist"
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
    res.json("titleId may be null or undefined")
   }
}


exports.updateTitle = (req,res)=>{

    const titleId = req.body.titleId;
    const description = req.body.description;
    const title= req.body.title; 
   


    if(titleId!==null && typeof titleId !=="undefined"){
        
        titleModel.findOneAndUpdate ({_id: titleId}, 
            {
                
                description:description,
                title:title
              
                
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
                            message: "couldn't update , Record with this titleId may be not found"
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
        res.json("titleId  may be null or undefined")
       }
}
