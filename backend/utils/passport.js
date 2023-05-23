
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const { createGoogleUser } = require('../services/AuthService');
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: true
},
    async function (request, accessToken, refreshToken, profile, cb) {
        // console.log(profile)
        const googleUser = {

            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            email: profile._json.email,
            avatar: profile._json.picture,
        };


        try {
            const theGoogleUser = await createGoogleUser(googleUser, request)
            cb(null, theGoogleUser)
        } catch (error) {
            console.log(error)
        }
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user);
})

passport.deserializeUser((user, cb) => {
    cb(null, user);
})

