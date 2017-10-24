var router = require('express').Router();
var db = require('../db');

router.get('/', function(req, res) {
  db.query('SELECT * FROM course', function(err, results) {
    if (err) {
      console.log(err);
      res.send(500, 'Sorry, some errors occured :(');
    } else {
      res.send(results);
    }
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;

  db.query('SELECT * FROM course WHERE id = ?', [id], function(err, results) {
    if (err) {
      console.log(err);
      res.send(500, 'Sorry, some errors occured :(');
    } else {
      res.send(results[0]);
    }
  });
});

module.exports = router;