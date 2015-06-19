var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('testResult/list');
});

router.get('/new', function(req, res) {
  res.render('testResult/new');
});

module.exports = router;
