var express = require('express');
var router = express.Router();

const WaitlistEntry = require('../models/waitlistEntry');

router.get('/', function(req, res, next) {
  WaitlistEntry.find({}, function(err, waitlistEntries){
    res.render('waitlist_entries/index', {
      csrf: req.csrfToken(),
      title: 'Waitlist Entries',
      waitlistEntries: waitlistEntries
    });
  });
});

router.post('/', function(req, res, next) {
  console.log(req)
  res.redirect('/waitlist_entries');
  //new WaitlistEntry({email: req.body.email}).save(function (err, waitlistEntry) {
    //if (err) {
      //res.send(err);
    //} else {
      //res.redirect('/waitlist_entries');
    //}
  //});
});

router.post('/seed', require('./seeds'));

module.exports = router;
