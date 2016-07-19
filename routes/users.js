var express = require('express');
var router = express.Router();

const Account = require('../models/account');

router.get('/', function(req, res, next) {
  Account.find({}, function(err, users){
    if (err) {
      console.log('Error retrieving users', err)
    }

    res.render('users/index', {
      title: 'Users',
      users: users
    });
  });
});

router.get('/:username', function(req, res, next) {
  Account.findOne({username: req.params.username}, function(err, user){
    res.send(user);
  });
});


module.exports = router;
