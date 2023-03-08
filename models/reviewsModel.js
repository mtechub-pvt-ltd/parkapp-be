
const mongoose  = require ("mongoose")

const reviewsSchema = new mongoose.Schema({
        _id:mongoose.Schema.Types.ObjectId,
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }, 
            location_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "location"
            },
            
        name: String,
        review:String,
        picture:Object,

            
})

module.exports = mongoose.model ("user-reviews" , reviewsSchema)