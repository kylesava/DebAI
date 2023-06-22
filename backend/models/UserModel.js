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
      default:  "https://scontent.fbwa1-1.fna.fbcdn.net/v/t1.15752-9/355963233_221024274146752_1208712342795325701_n.jpg?_nc_cat=100&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_ohc=IfT_EbUiTZEAX9plmgi&_nc_ht=scontent.fbwa1-1.fna&oh=03_AdRGwggIYgvb6aqwuyCZhtr1qN6XCe7HVTkj9VtqfVwDzw&oe=64BBF0EC",
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
