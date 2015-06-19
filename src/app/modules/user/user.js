var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('user/list');
});

router.get('/new', function(req, res) {
  res.render('user/new');
});

module.exports = router;
