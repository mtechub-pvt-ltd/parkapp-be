
const mongoose = require ( "mongoose")
const reviewsModel = require ("../models/reviewsModel")
const cloudinary = require("../utils/cloudinary")

exports.getAllReviews = async (req,res)=>{
try{
    const result = await reviewsModel.find({}).populate("location_id").populate("user_id");
    if(result.length > 0){
        res.json({
            message : "All reviews of users fetched successfully",
            result: result
        })
    }
    else{
        res.json({
            message: "No review found by any user",
            result: result
        })
    }
}  
catch(error){
    res.json({
        message: "Error occurred while fetching reviews",
        Error : error,
        errorMessage : err.message
    })
} 

}

exports.getReviewsByUserId =async (req,res)=>{
    const user_id = req.params.user_id;
    try{
        const result = await reviewsModel.find({user_id: user_id}).populate("location_id").populate("user_id");
        if(result.length > 0){
            res.json({
                message : "All reviews of this user fetched successfully",
                result: result
            })
        }
        else{
            res.json({
                message: "No review found of user",
                result: result
            })
        }
    }  
    catch(error){
        res.json({
            message: "Error occurred while fetching reviews",
            Error : error,
            errorMessage : err.message
        })
    } 
}

exports.createReview =async (req,res)=>{
    const user_id = req.body.user_id;
    const location_id = req.body.location_id;
    const name = req.body.name;
    const review = req.body.review;
    console.log(req.file)
    let userPic;
        try{
            if(req.file){
                console.log(req.file)
                const c_result = await cloudinary.uploader.upload(req.file.path)
               console.log(c_result.secure_url)
               userPic= {
                userPicUrl:c_result.secure_url,
                public_id:c_result.public_id
               };
            }
            else{
                userPic= {}
            }
            
        }catch(err)
        {console.log(err)}
            

    const newReview = new reviewsModel({
        _id:mongoose.Types.ObjectId(),
        user_id: user_id,
        location_id: location_id,
        name: name,
        review: review,
        picture: userPic
    })

    newReview.save(function(err,result){
        try{
            if(result){
                res.json({
                    message: "review has been added ",
                    result: result,
                    statusCode: 201
                })
            }
            else{
                res.json({
                    message: "review has not been added",
                    statusCode: 500
                })
            }
        }
        catch(err){
            res.json({
                message: "error occurred while adding review",
                errorMessage:err.message,
                statusCode: err.statusCode
            })
        }
    })

}

exports.deleteReview = async (req,res)=>{
    const review_id = req.params .review_id;
    try{
        const result= await reviewsModel.findOne({_id: review_id});
        if(result){
            await cloudinary.uploader.destroy(result.picture.public_id)
        }else{
            console.log("not found this review ")
        }
    }
    catch(err){console.log(err)}
    

    reviewsModel.deleteOne({_id: review_id} , function(err,result){
        try{
            if(result.deletedCount > 0){
                res.json({
                    message: "review deleted successfully",
                    statusCode:200,
                    result:result
                })
            }
            else{
                res.json({
                    message: "review could not be deleted successfully , review with this id may not exist",
                    statusCode:400
                })
            }
        }
        catch(err){
            res.json({
                message: "error occurred while deleting review",
                Error: error.message,
                statusCode:500
            })
        }
    })
}

exports.updateReview = async (req,res)=>{
    const review_id = req.body.review_id;
    const user_id = req.body.user_id;
    const location_id = req.body.location_id;
    const name = req.body.name;
    const review = req.body.review;

    console.log(review_id)
    //---------------------------------
    //deleting previous picture from cloudinary
    try{
        const result= await reviewsModel.findOne({_id: review_id});
        if(result){
            await cloudinary.uploader.destroy(result.picture.public_id)
        }else{
            console.log("not found this review ")
        }
    }
    catch(err){console.log(err)}
    //----------------------------------------------

    // uploading new picture in to cloudinary
    let userPic;
    try{
        if(req.file){
            console.log(req.file)
            const c_result = await cloudinary.uploader.upload(req.file.path)
           console.log(c_result.secure_url)
           userPic= {
            userPicUrl:c_result.secure_url,
            public_id:c_result.public_id
           };
        }
        else{
            userPic= {}
        }
        
    }catch(err)
    {console.log(err)}




    reviewsModel.findOneAndUpdate({_id: review_id},
        {
        user_id: user_id,
        location_id: location_id,
        name: name,
        review: review,
        picture: userPic
            
        },
        {
            new: true
        } , function (err, result) {
            try{
                if(result){
                    res.json({
                        message: "Review has been updated successfully",
                        result: result,
                        statusCode: 201,
                    })
                }
                else{
                    res.json({
                        message: "Review could not be updated successfully , review with this id may not exist",
                        result: result,
                    })
                }
            }
            catch(err){
                res.json({
                    message: "Error occurred while updating review",
                    Error: err,
                    errorMessage: err.message,
                    statusCode:500

                })
            }
        })
    
}

exports.getReviewsByLocation= async (req,res)=>{
    const location_id= req.query.location_id;
    try{
        const result= await reviewsModel.find({location_id:location_id})

        if(result){
            res.json({
                message:"All reviews about this location:",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message:"could not found reviews about this location , location with this id may not exist:",
                result:result,
                statusCode:400
            })
        }
    }
    catch(error){
        res.json({
            message: "Error occurred while fetching reviews",
            Error:error.message
        })
    }
    

}