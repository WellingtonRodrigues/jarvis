var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var User = require('./model');
var logger = require('../logger/logger');
var authentication = require('./authentication');

module.exports = function(passport) {
  authentication(passport);

  router.get('/', function(req, res){
    User
      .find()
      .sort({ _id: -1 })
      .exec(function(err, users) {
        if (err)
          return console.error(err);

        res.render('user/list', { users: users });
      });
  });

  router.get('/auth', function(req, res) {
    res.render('user/auth');
  });

  router.post('/auth', function(req, res, next) {
    passport.authenticate('local', function(err, user, response) {
      logger('info', 'Authentication request: ' + req.body.email);

      if (err) {
        logger('error', 'Authentication error: ' + req.body.email);
        req.flash('error', err);
        return res.redirect('/users/auth');
      }

      if (!user) {
        logger('error', 'Authentication error, user not found: ' + req.body.email);
        req.flash(response.message);
        return res.redirect('/users/auth');
      } else {
        req.logIn(user, function(err) {
          if (err) {
            logger('error', err);
            req.flash('error', err);
            return res.redirect('/users/auth');
          }

          logger('info', 'Authentication success: ' + req.body.email);
          return res.redirect('/questions');
        });
      }
    })(req, res, next);
  });

  router.get('/new', function(req, res){
    res.render('user/new');
  });

  router.post('/new', function(req, res) {
    var user = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password && crypto.createHash('sha512').update(req.body.password).digest('hex'),
      role: req.body.role
    };

    User.findOne({email: user.email}, function(err, userExists) {
      if (err) {
        res.locals.notifications = [{
          level: 'error',
          message: err
        }];

        res.render('user/new');
        return;
      } else if (userExists) {
        res.locals.notifications = [{
          level: 'error',
          message: "O e-mail já está sendo utilizado por outro usuário."
        }];

        res.render('user/new');
      } else {
        User.create(user, function(err, user) {
          if (err) {
            res.locals.notifications = [{
              level: 'error',
              message: err
            }];

            res.render('user/new');
          } else {
            logger('info', 'Usuário com o e-mail ' + user.email + ' cadastrado.');

            res.redirect('/users');
          }
        });
      }
    });
  });

 router.get('/edit', function(req, res){
    res.render('user/new');
  });

  router.get('/register', function(req, res){
    res.render('user/register');
  });

  router.post('/register', function(req, res) {
    var user = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password && crypto.createHash('sha512').update(req.body.password).digest('hex'),
      role: 'student'
    };

    User.findOne({ email: user.email }, function(err, userExists) {
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

            logger('info', 'Usuário com o e-mail ' + user.email + ' cadastrado.');
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

  router.get('/:id/remove', function(req, res) {
    User.remove({ _id: req.params.id }, function(err) {
      if (err)
        return console.error(err);

      res.redirect('/users');
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

  router.get('/logout', passport.authorize('local'), function(req, res) {
    logger('info', 'User logout: ' + req.user.email)
    req.logout();
    res.redirect('/users/auth');
  });

  return router;
};
