var express = require('express');
var router = express.Router();

const WaitlistEntry = require('../models/waitlistEntry');

router.get('/', function(req, res, next) {
  WaitlistEntry.find({}, function(err, waitlistEntries){
    console.log(waitlistEntries);
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

module.exports = router;
