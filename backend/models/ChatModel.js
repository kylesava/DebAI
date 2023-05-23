const mongoose =require("mongoose")

const ChatSchema=mongoose.Schema({

    text:{
        type:String,
        required:true,

    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    debate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Debate",
        required:true
    }

},{
    timestamps:true
});


module.exports = mongoose.model("Chat",ChatSchema)
