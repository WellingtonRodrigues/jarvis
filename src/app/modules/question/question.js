var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('question/list');
});

router.get('/new', function(req, res) {
  res.render('question/new');
});

router.post('/new', function(req, res) {
  res.redirect('../');
});

router.get('/categories', function(req, res) {
  res.render('question/category/list');
});

router.get('/categories/new', function(req, res) {
  res.render('question/category/new');
});

module.exports = router;
