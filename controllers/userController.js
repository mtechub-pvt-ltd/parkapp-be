const User = require("../models/User");
const mongoose = require("mongoose");
exports.createUser=(req,res)=>{
  try {
   
    const user= new User({
        _id:mongoose.Types.ObjectId(),
        token: req.body.token
    })
    
    user.save();

    res.json({
      data: { user },
      message: "User Created successfully",
      success: true,
    });
  } catch (e) {
    res.status(400).json({ message: e.message, success: false });
  }
};

exports.getAllUser=async (req,res)=>{

        const userDetails=await User.aggregate([
          {
            $lookup:
            {
                from: "findings",
                localField: "_id",
                foreignField: "userId",
                as: "user_saved&finding_Locations"
            }
    
        },
        {
          $lookup:
          {
              from: "userparkings",
              localField: "_id",
              foreignField: "userId",
              as: "userParkings"
          }
    
      },
        
      ]);
    
        res.send({
          message:"User Has fetched with his necessary details",
          userDetails:userDetails,
        })
    
  }


  exports.getUserByToken= (req,res)=>{
      const token = req.params.token;
      userModel.findOne({token:token} , function(err,result){
        try{
          if(result){
            res.json({
              message : "User with this token is :",
              result:result,
              statusCode: 200,
              
            })
          }
          else{
            res.json({
              message: "could not found User with this token",
              result:result,
            })
          }
        }
        catch(err){
          res.json({
            message: "Error occurred while fetching user ",
            errorMessage: err.message,
            statusCode:500
          })
        }
      })
  }



exports.getUser=async (req,res)=>{
    const userId = req.params.userId;
    User.findOne({_id:userId}, async function(err,result){
        try{

          const userDetails=await User.aggregate([
            { $match: { _id:result._id} },
           
            {
              $lookup:
              {
                  from: "findings",
                  localField: "_id",
                  foreignField: "userId",
                  as: "userFinding&saves_locations"
              }
      
          },
          {
            $lookup:
            {
                from: "userparkings",
                localField: "_id",
                foreignField: "userId",
                as: "user_parkings"
            }
      
        },
        {
          $lookup:
          {
              from: "user-reviews",
              localField: "_id",
              foreignField: "user_id",
              as: "user-reviews"
          }
    
      },
          
        ]);
      
          res.send({
            message:"User Has fetched with his necessary details",
            result:result,
            userDetails:userDetails,
          })
        }
        catch (err) {
          res.status(400).json({ message: err.message, success: false });
        }
    })
 
};

exports.deleteUser=(req,res)=>{
  const userId = req.params.userId;
  User.deleteOne({_id:userId}, function(err,result){
      try{
        if(result.deletedCount > 0){
          res.json({
            message: "document deleted",
            result: result
          })
        }
        else{
          res.json({
            message: "document not found",
            result:result
          }
          )
        }
        
        
      }
      catch (err) {
        res.status(400).json({ message: err.message, success: false });
      }
  })

};
exports.updateUser=(req,res)=>{
  const userId = req.body.userId;
  const token = req.body.token;
  User.findOneAndUpdate({_id:userId},{token:token}, function(err,result){
      try{
          if(result !==null && typeof result !== 'undefined'){
            res.json({
              message: "document updated",
              result:result
            })
          }
          else{
            res.json({
              message: "No changes updated"
            })
          }
        }
      catch (err) {
        res.status(400).json({ message: err.message, success: false });
      }
  })

};