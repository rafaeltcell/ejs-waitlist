var express = require('express');
var router = express.Router();

const WaitlistEntry = require('../models/waitlistEntry');

router.get('/', function(req, res, next) {
  WaitlistEntry.find({}, function(err, waitlistEntries){
    res.render('waitlist_entries/index', {
      title: 'Waitlist Entries',
      waitlistEntries: waitlistEntries
    });
  });
});

router.post('/', function(req, res, next) {
  new WaitlistEntry({email: req.body.email}).save(function (err) {
    res.send(err);
  });
});

router.post('/seed', function(req, res, next) {
  WaitlistEntry.remove({}, function(err) {
    if (err) {
      res.send(err)
    } else {
      var seeds = []
      for(count = 0; count < 1000; count++){
        seeds.push({email: ("waitlist+" + count + "@tcell.io")})
      }
      WaitlistEntry.collection.insert(seeds, function(err, docs) {
        res.send(docs)
      });
    }
  });
});

module.exports = router;
