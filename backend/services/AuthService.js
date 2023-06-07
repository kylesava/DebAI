const bcrypt = require("bcrypt")
const UserModel = require("../models/UserModel")
const {stripe} = require("../utils/stripe")
const { getUserSubscriptionStatus } = require("./UtilityMethods")

class AuthService {

    async createGoogleUser(user, req) {
        if (user) {
            const { email } = user
            try {
                const User = await UserModel.findOne({ email })
                if (User) {
                    await UserModel.findByIdAndUpdate(User._id, {
                        $set: {
                            lastLoggedIn: Date.now()
                        }
                    })
                    const {stripeCustomerId} = User._doc;
                    User._doc.subscription =  await getUserSubscriptionStatus(
                        stripeCustomerId
                      );
                    const { password,  ...others } = User._doc
                    req.session.user = {
                        ...others,
                    }
                    return req.session.user
                } else {
                    const customer = await stripe.customers.create(
                        {
                          email,
                        },
                        {
                          apiKey: process.env.STRIPE_SECRET_KEY,
                        }
                      );
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(user.firstName, salt)
                    user.password = hashedPassword
                    user.lastLoggedIn = Date.now()
                    user.stripeCustomerId =customer.id;
                    const User = await UserModel.create(user)
                    User._doc.subscription = await getUserSubscriptionStatus(
                        customer.id
                      );
                    const { password, ...others } = User._doc
                    req.session.user = {
                        ...others,
                    }
                    return req.session.user
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

    async isUserUpdated(prevUser) {
        try {
            const user = await UserModel.findById(prevUser._id)
            if(user){
                throw "no user found"

            }
            const { updatedAt: newUserUpdatedTime } = user._doc;
            const { updatedAt: prevUserUpdatedTime } = prevUser
            let newUpdatedTimeInMS = new Date(newUserUpdatedTime).getTime()
            let prevUpdatedTimeInMS = new Date(prevUserUpdatedTime).getTime()
            if (newUpdatedTimeInMS > prevUpdatedTimeInMS) {
                const { password, ...others } = user._doc
                return {...others}
            } else {
                return prevUser
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }



    async hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)
            return hashed
        } catch (error) {
            return error
        }
    }
    async compareHashPassword(password, hashPassword) {
        try {
            const hashed = await bcrypt.compare(password, hashPassword)
            return hashed
        } catch (error) {
            return error
        }

    }


}
module.exports = new AuthService()
