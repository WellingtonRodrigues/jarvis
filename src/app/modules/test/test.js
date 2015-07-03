var express = require('express');
var router = express.Router();
var Test = require('./models/test');
var Question = require('../question/models/question');

router.get('/', function(req, res) {
  Test
    .find()
    .sort({ _id: -1 })
    .exec(function(err, tests) {
      if (err)
        logger('error', err);

      res.render('test/list', { tests: tests });
    });
});

router.get('/new', function(req, res) {
  Question
    .find()
    .sort({ title: 1 })
    .exec(function(err, questions) {
      if (err)
        logger('error', err);

      res.render('test/new', { questions: questions });
    });
});

router.get('/:testId/remove', function(req, res) {
  Test.findByIdAndRemove(req.params.testId, function(err) {
    if (err)
      logger('error', err);

    res.redirect('/tests');
  });
});

module.exports = router;
