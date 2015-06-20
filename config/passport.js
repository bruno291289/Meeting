module.exports = function(app) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var mongoose = require('mongoose');
    var User = mongoose.model('User');


    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(username, password, done) {
            console.log('validating the user ' + username + ' - ' + password);

            User.findOne({
                email: username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }

                console.log('user found ' + user);

                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }

                console.log('validating password ' + user.validPassword(password));

                if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                return done(null, user);
            });
        }
    ));
}