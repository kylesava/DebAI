const mongoose = require("mongoose")

const userType= {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}

const motionSchema =mongoose.Schema({
    topic:{
        type:String,
        unique:[true,"topic cannot be same"],
        required:[true,"Topic is required"]
    },
    group:{
        type:String,
        enums:[
            "senior",
            "junior",
        ]
    },
    type:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MotionCat"
    },
    comments:[
        {
            userId:userType,
            comment:String
        }
    ]
},
{
    timestamps:true
})

module.exports  = mongoose.model("Motion",motionSchema)

