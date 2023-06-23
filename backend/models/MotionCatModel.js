const mongoose = require("mongoose")


const motionSchema =mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    }
},
{
    timestamps:true
})

module.exports  = mongoose.model("MotionCat",motionSchema)