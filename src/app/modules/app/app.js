var express = require('express');
var server = express();
var http = require('http').Server(app);

var PORT = 8500;

var app = {
    start: function() {
        http.listen(PORT, function() {
            console.log('JARVIS RUNNING ON: ' + PORT);
        });
    }
};

module.exports = app;