var express = require('express');
var expressApp = express();
var passport = require('passport');
var http = require('http').Server(expressApp);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var messages = require('express-messages');
var mongoose = require('mongoose');
var logger = require('../logger/logger');
var question = require('../question/question')(passport);
var test = require('../test/test');
var user = require('../user/user')(passport);

var PORT = 8500;
var SECRET = 'secret';
var KEY = 'session';
var COOKIE_AGE = 3600000;

var App = {};

App.start = function() {
  logger('info', 'Starting JARVIS up...');

  setSessionMiddleware();
  setPassportAuthenticationMiddleware();
  setBodyParserMiddleware();
  setStaticFilesMiddleware();
  setRouteLoggerMiddleware();
  setFlashMessagesMiddleware();
  setModuleRoutingMiddleware();
  setViewEngine();

  expressApp.get('/', function(req, res) {
    res.redirect('/users/auth');
  });

  connectToDb(function() {
    http.listen(PORT, function() {
      logger('info', 'JARVIS RUNNING ON: ' + PORT);
    });
  });
};

var setSessionMiddleware = function() {
  expressApp.use(cookieParser());
  expressApp.use(session({
    secret: SECRET,
    name: KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: COOKIE_AGE
    }
  }));
};

var setPassportAuthenticationMiddleware = function() {
  expressApp.use(passport.initialize());
  expressApp.use(passport.session());
};

var setBodyParserMiddleware = function() {
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({
    extended: true
  }));
};

var setViewEngine = function() {
  expressApp.set('views', 'src/app/templates')
  expressApp.set('view engine', 'jade');
};

var setStaticFilesMiddleware = function() {
  expressApp.use(express.static('src/assets'));
};

var setRouteLoggerMiddleware = function() {
  expressApp.use(function(req, res, next) {
    if (req.user)
      logger('info', req.path + ' request by ' + req.user.email);
    else
      logger('info', req.path + ' request by unauthorized user');

    next();
  });
};

var setFlashMessagesMiddleware = function() {
  expressApp.use(flash());
  expressApp.use(function(req, res, next) {
    res.locals.messages = messages(req, res);
    next();
  });
};

var setModuleRoutingMiddleware = function() {
  expressApp.use('/questions', question);
  expressApp.use('/tests', test);
  expressApp.use('/users', user);
};

var connectToDb = function(callback) {
  mongoose.connect('mongodb://127.0.0.1:27017/jarvis');
  mongoose.connection.once('open', callback);
  mongoose.connection.on('error', function(err) {
    logger('error', err);
    process.exit();
  });
};

module.exports = App;
