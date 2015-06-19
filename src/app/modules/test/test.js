var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('test/list');
});

router.get('/new', function(req, res) {
  res.render('test/new');
});

module.exports = router;
