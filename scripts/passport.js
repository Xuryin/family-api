var bodyParser = require('body-parser');
var passport = require('passport');
var session = require("express-session");
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((uname, password, done) => {
    try {
        //If the credentials are not valid (for example, if the password is incorrect),
        // done should be invoked with false instead of a user to indicate an authentication failure.
        // An additional info message can be supplied to indicate the reason for the failure.
        // This is useful for displaying a flash message prompting the user to try again.
        if (uname != 'aaa') {
            return done(null, false, { message: 'Incorrect username.' })
        }
        if (password != 'aaa') {
            return done(null, false, { message: 'Incorrect password.' })
        }
        //If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.
        return done(null, user);
    } catch (e) {
        return done(err)
    }
}))


// 一些基本的回调
exports.pass = () => {
    passport.serializeUser((user, done) => {
        done(null. user.id)
    })

    passport.deserializeUser((id, done) => {
        UserModel.findById(id, function(err, user) {
            done(err, user);
        })
    })

}


