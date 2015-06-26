module.exports = function(passport) {

  var express = require('express');
  var crypto = require('crypto');
  var router = express.Router();
  var LocalStrategy = require('passport-local').Strategy;
  var mongoose = require('mongoose');
  var User = require('./model');
  var logger = require('../logger/logger');

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, function(email, password, done) {
    User.findOne({email: email}, function(err, user) {
      if (err) {
        return done(null, false, {
          message: err,
          status: "n"
        });
      } else if (!user) {
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

  router.post('/auth', function(req, res, next) {
    passport.authenticate('local', function(err, user, response) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.json(response);
      } else {
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          return res.json(user);
        });
      }
    })(req, res, next);
  });

  router.get('/', function(req, res){
    res.render('user/list');
  });

  router.get('/new', function(req, res){
    res.render('user/new');
  });

  router.post('/register', function(req, res) {
    var user = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password && crypto.createHash('sha512').update(req.body.password).digest('hex'),
      roles: req.body.roles
    };
    User.findOne({email: user.email}, function(err, userExists) {
      if (err) {
        res.json({
          message: err,
          status: "n"
        });
      } else if (userExists) {
        res.json({
          status: "n",
          message: "O e-mail já está sendo utilizado por outro usuário."
        });
      } else {
        User.create(user, function(err, user) {
          if (err) {
            res.json({
              message: err,
              status: "n"
            });
          } else {
            res.json({
              status: "s",
              message: "Usuário cadastrado com sucesso."
            });
            logger.register('info', 'Usuário com o e-mail ' + user.email + ' cadastrado.');
          }
        });
      }
    });
  });

  router.post('/password/change', function(req, res) {
    var user = req.user;
    var password = req.body.password;
    User.findById(user._id, function(err, userExists) {
      if (err) {
        res.json({
          message: err,
          status: "n"
        });
      } else if (userExists && password.old != userExists.password) {
        res.json({
          status: "n",
          message: "A senha antiga está incorreta."
        });
      } else if (userExists) {
        userExists.password = crypto.createHash('sha512').update(password.new).digest('hex');
        userExists.save(function(err, user) {
          if (err) {
            res.json({
              message: err,
              status: "n"
            });
          } else {
            res.json({
              status: "s",
              message: "A senha foi alterada com sucesso."
            });
          }
        });
      } else {
        res.json({
          status: "n",
          message: "Autentique novamente e tente de novo."
        });
      }
    });
  });

  router.get('/isLogged', function(req, res) {
    if (req.user) {
      if (req.user.password) {
        delete req.user.password;
      }
      res.json({
        user: req.user,
        authenticate: true
      });
    } else {
      res.json({
        user: {},
        authenticate: false
      });
    }
  });

  router.post('/logout', function(req, res) {
    req.logout();
    res.json({
      authenticate: false
    });
  });

  return router;

};
