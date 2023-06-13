const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"]
    },
    lastName: { 
      type: String,
      required: [true, "lastName is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
    },
    stripeCustomerId: {
      type: String,
    },
    avatar: {
      type: String,
      default:  "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/53.jpg?alt=media&token=7cda4c2e-f7ab-4b4c-a6e0-807ad2366672",
    },
    equipedAvatars:[],
    verified:{
      type:Boolean,
      default:false,
    },  
    lastLoggedIn: Number,
    country:String,
    points:{
      type:Number,
      default:500,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
