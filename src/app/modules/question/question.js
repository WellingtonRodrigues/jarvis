var express = require('express');
var router = express.Router();

var Question = require('./model');
var Category = require('./categoryModel');

router.get('/', function(req, res) {
  res.render('question/list');
});

router.get('/new', function(req, res) {
  res.render('question/new');
});

router.post('/new', function(req, res) {
	var question = {
	  description: req.body.description,
	  statement: req.body.statement
	  //TODO: Setar categoria
	  //TODO: Setar alternativas
	};
	Question.create(question, function(err, question) {
    if (err) {
      res.json({
        message: err,
        status: "n"
      });
    }
    else {
      res.json({
        status: "s",
        message: "Questão cadastrada com sucesso."
      });
      logger.register('info', 'Questão com descrição "' + question.description + '" cadastrada.');
    }
  });
});

router.get('/categories', function(req, res) {
  res.render('question/category/list');
});

router.get('/categories/new', function(req, res) {
  res.render('question/category/new');
});

router.post('/categories/new', function(req, res) {
  var category = {
	  name: req.body.name
	};
	Category.create(category, function(err, category) {
    if (err) {
      res.json({
        message: err,
        status: "n"
      });
    }
    else {
      res.json({
        status: "s",
        message: "Categoria cadastrada com sucesso."
      });
      logger.register('info', 'Categoria com nome "' + category.name + '" cadastrada.');
    }
  });
});

module.exports = router;
