var express = require('express');
var router = express.Router();

const WaitlistEntry = require('../models/waitlistEntry');

router.get('/', function(req, res, next) {
  res.send({status: "alive"});
});

router.post('/', function(req, res, next) {
  WaitlistEntry.remove({}, function(err) {
    if (err) {
      res.send(err)
    } else {
      var seeds = []
      for(count = 0; count < 1000; count++){
        seeds.push({email: ("waitlist+" + count + "@tcell.io")})
      }
      WaitlistEntry.collection.insert(seeds, function(err, docs) {
        res.send(err)
      });
    }
  });
});

router.get('/just_testing', require('./justTesting'));


module.exports = router;
