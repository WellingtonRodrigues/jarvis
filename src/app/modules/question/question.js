function question(router) {
  router.get('/', function(req, res) {
    res.render('question/list');
  });

  router.get('/new', function(req, res) {

  });

  router.post('/new', function(req, res) {
    res.redirect('../');
  });

  return router;
};

module.exports = question;
