var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({status: "just_testing"});
});

router.get('/wee', function(req, res, next) {
  res.send({status: "wee"});
});

router.post('/wee', function(req, res, next) {
  res.send({status: "wee"});
});

module.exports = router;
