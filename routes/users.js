var router = require('express').Router();
var db = require('../db');

// retrieve all users in the database
router.get('/', function(req, res) {
  db.query('SELECT * FROM student', function(err, results) {
    if (err) {
      console.log(err);
      res.send(500, 'Sorry, some errors occured :(');
    } else {
      res.send(results);
    }
  });
});

// retrieve an user specified by username in the database
router.get('/:username', function(req, res) {
  var username = req.params.username;

  db.query('SELECT * FROM student WHERE username = ?', [username], function(err, results) {
    if (err) {
      console.log(err);
      res.send(500, 'Sorry, some errors occured :(');
    } else {
      res.send(results[0]);
    }
  });
});

// retrieve all courses enrolled of an user specified by username in the database
router.get('/:username/courses', function(req, res) {
  var username = req.params.username;
  var queryStr = 'SELECT DISTINCT c.* FROM enroll e INNER JOIN student s ON s.username = e.student INNER JOIN course c ON c.id = e.course WHERE s.username = ? ORDER BY c.id';

  db.query(queryStr, [username], function(err, results) {
    if (err) {
      console.log(err);
      res.send(500, 'Sorry, some errors occured :(');
    } else {
      res.send(results);
    }
  });
});

module.exports = router;