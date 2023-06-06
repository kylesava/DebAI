const UserModel = require("../models/UserModel");
const { stripe } = require("../utils/stripe");
const {
  hashPassword,
  compareHashPassword,
} = require("../services/AuthService");
const { getUserSubscriptionStatus } = require("../services/UtilityMethods");
const EmailService = require("../services/EmailService");

class AuthController {
  async register(req, res) {
    const { email, password: thePassword } = req.body;
    try {
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        throw Error("This email is  already used");
      }
      const customer = await stripe.customers.create(
        {
          email,
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY,
        }
      );

      req.body.lastLoggedIn = Date.now();
      req.body.password = await hashPassword(thePassword);
      req.body.stripeCustomerId = customer.id;
      let savedUser = await UserModel.create(req.body);
      savedUser._doc.subscription = await getUserSubscriptionStatus(
        customer.id
      );
      const confirmationHash =  EmailService.createEmailConfirmationHash(email)
      console.log("the hash",confirmationHash)
      
       await EmailService.confirmationEmail({

          text:"Confirm  your DebAi gmail account",
          subject:"DebAi wants to confirm your email . ",
          email,
          html:`<div> <h1> Hello DebAi welcomes you  </h1> </br> <h3> You are closer to be the part of debAi .  </h3> </br> <h4>Click the button below to confirm your email address. </h4> <br/> <a style="background:blue;height:40px; padding:8px ; cursor:pointer;letter-spacing:1px; border-radius:4px;text-align:center;color:white;" href="http://localhost:3000/confirmation/${confirmationHash}"> CONFIRM EMAIL </a> </br> <br> <br>  </div>`
        })


      return res.status(200).json({ message: "email sent for verification", success: true });
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
  }

  async login(req, res) {
    const { email, password: userPassword } = req.body;
    try {
      let userExist = await UserModel.findOne({ email });
      if (!userExist) {
        return res.status(403).json({ message: "This email is not registerd" });
      }
      const { password, _id, stripeCustomerId } = userExist._doc;
      const isPasswordValid = await compareHashPassword(userPassword, password);
      const lastLoggedIn = Date.now();
      if (isPasswordValid) {
        await UserModel.findByIdAndUpdate(
          _id,
          {
            lastLoggedIn,
          },
          {
            new: true,
          }
        );

        userExist._doc.subscription = await getUserSubscriptionStatus(
          stripeCustomerId
        );
        userExist._doc.lastLoggedIn = lastLoggedIn;
        req.session.user = userExist._doc;
 

        res.status(200).json({ message: userExist._doc, success: true });
      } else {
        res
          .status(403)
          .json({ message: "invalid credentails", success: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message, success: false });
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw Error(err);
        }
        res.clearCookie("debatosour.sid");
        res
          .status(200)
          .json({ message: "successfully logged out", success: true });
      });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  }

  async handleConfirmation(req,res){
    const {token} = req.params;
    console.log("i am inside",token)

    try {
    const {email,exp,invalidLink} =  await  EmailService.verifyEmailConfirmationToken(token);
    console.log("the res",email,exp,invalidLink);

    
    if(email){
      const user = await UserModel.findOneAndUpdate(
        {
        email  
        },{
        verified:true
      },{
        new:true,
        returnOriginal:false
      })
      const {password,...other} = user._doc;
      req.session.user=  other;
      return res.status(200).json({message:other,success:true ,exp:false})
    }else{
      return res.status(200).json({message:"Link  expired try again",success:false ,exp:true})

    }
    } catch (error) {
      return res.status(500).json({message:"Invalid link try again later ",success:false ,exp:true})
    }
  }
}
module.exports = new AuthController();
