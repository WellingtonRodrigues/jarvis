var crypto = require('crypto');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./model');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) {
        return done(err, false, {
          message: err,
          status: "n"
        });
      }

      if (!user) {
        return done(null, false, {
          message: "O usuário não existe.",
          status: "n"
        });
      } else if (crypto.createHash('sha512').update(password).digest('hex') != user.password) {
        return done(null, false, {
          message: "A senha está incorreta.",
          status: "n"
        });
      } else {
        return done(null, user);
      }
    });
  }));
};
