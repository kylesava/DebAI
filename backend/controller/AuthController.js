const UserModel = require("../models/UserModel");
const { stripe } = require("../utils/stripe");
const {
  hashPassword,
  compareHashPassword,
} = require("../services/AuthService");
const { getUserSubscriptionStatus } = require("../services/UtilityMethods");

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
      const { password, ...other } = savedUser._doc;

      req.session.user = other;

      return res.status(200).json({ message: other, success: true });
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
        console.log(userExist._doc);

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
}
module.exports = new AuthController();
