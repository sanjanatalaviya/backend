const passport = require('passport');
const Users = require('../model/users.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const GoogleLoginProvider = async () => {
    try {
        await passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET_KEY,
            callbackURL: "http://localhost:8000/api/v1/users/google/callback"
        },
            async function (accessToken, refreshToken, profile, cb) {
                //     User.findOrCreate({ googleId: profile.id }, function (err, user) {
                //         return cb(err, user);
                //     });

                const user = await Users.findOne({ googleId: profile.id });
                console.log(user);

                if (!user) {
                    const user = await Users.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        role: 'user'
                    });
                    return cb(null, user);
                }
            }
        ));

        passport.serializeUser(function (user, done) {
            console.log("okokok", user);
            done(null, user);
        });

        passport.deserializeUser(async function (data, done) {
            try {
                done(null, data)
            } catch (err) {
                done(err, null)
            }
            // const user = await Users.findOne({ _id: id });
            // await Users.findById(id, function (err, user) {
            //     console.log("done---");
            //     done(err, user);
            // });
        });
    } catch (error) {
        console.log(error.message);
    }
}

const FacebookLoginProvider = async () => {
    try {
        await passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_CLIENT_ID_ECOMM,
            clientSecret: process.env.FACEBOOK_SECRET_KEY_ECOMM,
            callbackURL: "http://localhost:8000/api/v1/users/facebook/callback",
            profileFields: ['id', 'displayName', 'emails'],
            enableProof: true
        },
            async function (accessToken, refreshToken, profile, cb) {
                // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                //     return cb(err, user);
                // });
                const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
                // console.log(email);
                const user = await Users.findOne({ facebookId: profile.id });
                // console.log(user);
                if (!user) {
                    const user = await Users.create({
                        facebookId: profile.id,
                        name: profile.displayName,
                        // email: profile.emails[0].value,
                        email: email,
                        role: 'user'
                    });
                    return cb(null, user);
                }
            }
        ));

        passport.serializeUser(function (user, done) {
            // console.log("okokok", user);
            done(null, user.id);
        });

        passport.deserializeUser(async function (id, done) {
            const user = await Users.findById(_id);
            // await Users.findById(id, function (err, user) {
            //     console.log("done---");
            done(err, user);
            // });
        });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    GoogleLoginProvider,
    FacebookLoginProvider
};