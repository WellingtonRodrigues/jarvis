var express = require('express');
var expressApp = express();
var http = require('http').Server(expressApp);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var logger = require('../logger/logger');
var question = require('../question/question');
var test = require('../test/test');
var testResult = require('../testResult/testResult');
var user = require('../user/user');

var PORT = 8500;
var SECRET = 'secret';
var KEY = 'session';
var COOKIE_AGE = 3600000;

var setSession = function() {
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

var setBodyParser = function() {
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({
    extended: true
  }));
};

var setViewEngine = function() {
  expressApp.set('views', 'src/app/templates')
  expressApp.set('view engine', 'jade');
};

var setStaticMiddleware = function() {
  expressApp.use(express.static('src/assets'));
};

var setModuleRoutingMiddleware = function() {
  expressApp.use('/questions', question);
  expressApp.use('/tests', test);
  expressApp.use('/results', testResult);
  expressApp.use('/users', user);
};

var connectToDb = function(callback) {
  mongoose.connect('mongodb://127.0.0.1:27017/jarvis');
  mongoose.connection.once('open', callback);
  mongoose.connection.on('error', function(err) {
    console.error(err);
    process.exit();
  });
};

var app = {
  start: function() {
    setSession();
    setBodyParser();
    setViewEngine();
    setStaticMiddleware();
    setModuleRoutingMiddleware();

    expressApp.get('/', function(req, res) {
      res.render('layout');
    });

    connectToDb(function() {
      http.listen(PORT, function() {
        console.log('JARVIS RUNNING ON: ' + PORT);
        logger.register('info', 'JARVIS RUNNING ON: ' + PORT);
      });
    });
  }
};

module.exports = app;
