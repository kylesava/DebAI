const bcrypt = require("bcrypt")
const UserModel = require("../models/UserModel")

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
                    const { password, ...others } = User._doc
                    req.session.user = {
                        ...others,
                    }
                    return req.session.user
                } else {
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(user.firstName, salt)
                    user.password = hashedPassword
                    user.lastLoggedIn = Date.now()
                    const User = await UserModel.create(user)
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
            return error
        }
    }



    async hashPassword(password) {
        console.log()
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
