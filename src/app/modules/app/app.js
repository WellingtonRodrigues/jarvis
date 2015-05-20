var express = require('express')();
var http = require('http').Server(express);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var PORT = 8500;
var SECRET = 'secret';
var KEY = 'session';
var COOKIE_AGE = 3600000;

var setSession = function() {
    express.use(cookieParser());
    express.use(session({
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
    express.use(bodyParser.json());
    express.use(bodyParser.urlencoded({
        extended: true
    }));
};

var app = {
    start: function() {
    	setSession();
    	setBodyParser();

        http.listen(PORT, function() {
            console.log('JARVIS RUNNING ON: ' + PORT);
        });
    }
};

module.exports = app;
