var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Waitlist', user: req.user });
});

router.get('/ping', function(req, res, next) {
  res.send({status: "alive"})
});

router.get('/register', function(req, res, next) {
  res.render('register', {});
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { csrfToken: req.csrfToken(), user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/suspicious_redirect', function (req, res) {
  res.location('http://google.com')
  res.redirect('http://google.com')
})

module.exports = router;
