var express = require('express');
var router = express.Router();
var Question = require('./models/question');
var QuestionCategory = require('./models/questionCategory');
var logger = require('../logger/logger');

module.exports = function(passport) {
  router.get('/', function(req, res) {
    var query = { };

    if (req.query.category_id && req.query.category_id != '')
      query = {
        _categories: {
          $in: [req.query.category_id]
        }
      };

    console.log(query);

    var promise = Question
      .find(query)
      .populate('_categories')
      .sort({ title: 1 })
      .exec();

      promise
        .then(function(questions) {
          QuestionCategory
            .find()
            .sort({ title: 1 })
            .exec(function(err, categories) {
              if (err)
                logger('error', err);

              res.render('question/list', {
                questions: questions,
                categories: categories,
                currentCategoryId: req.query.category_id
              });
            });
        })
        .then(null, function(err) {
          if (err)
            logger('error', err);
        });
  });

  router.get('/new', function(req, res) {
    QuestionCategory
      .find()
      .sort({ title: 1 })
      .exec(function(err, categories) {
        if (err)
          logger('error', err);

        res.render('question/new', { categories: categories });
      });
  });

  router.post('/new', function(req, res) {
    var question = new Question({
      title: req.body.title,
      statement: req.body.statement
    });

    for (var i = 0; i < req.body.answer_titles.length - 1; i++) {
      question.answers.push({
        title: req.body.answer_titles[i],
        score: parseInt(req.body.answer_scores[i])
      });
    }

    for (i = 0; i < req.body.categories.length; i++) {
      question._categories.push(req.body.categories[i]);
    }

    question.save(function(err, question) {
      if (err) {
        logger('error', err);
        return res.redirect('/questions/new');
      }

      logger('info', 'Question created: ' + question._id)
      res.redirect('/questions');
    });
  });

  router.get('/:questionId/remove', function(req, res) {
    Question.findByIdAndRemove(req.params.questionId, function(err) {
      if (err)
        logger('error', err);

      logger('info', 'Question removed: ', req.params.questionId);
      res.redirect('/questions');
    });
  });

  router.get('/categories', function(req, res) {
    QuestionCategory
      .find()
      .sort({ name: 1 })
      .exec(function(err, categories) {
        if (err) {
          logger('error', err);
        }

        res.render('question/category/list', { categories: categories });
      });
  });

  router.get('/categories/new', function(req, res) {
    res.render('question/category/new');
  });

  router.post('/categories/new', function(req, res) {
    var questionCategory = new QuestionCategory({
      name: req.body.title
    });

    questionCategory.save(function(err, category) {
      if (err) {
        logger('error', err);
        return res.redirect('/questions/categories/new');
      }

      logger('info', 'Category created: ' + category._id);
      res.redirect('/questions/categories');
    });
  });

  router.get('/categories/:categoryId/remove', function(req, res) {
    QuestionCategory.findByIdAndRemove(req.params.categoryId, function(err) {
      if (err) {
        logger('error', err);
      }

      logger('info', 'Category removed: ' + req.params.categoryId);
      res.redirect('/questions/categories');
    });
  });

  return router;
};
