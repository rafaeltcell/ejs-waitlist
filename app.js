try {
  var tcellAgent = require('tcell-agent');
}
catch (e) {
  // this is for load-testing project
}
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('csurf')

var mongoose = require('mongoose');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var waitlistEntries = require('./routes/waitlistEntries');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true }))
app.use(require('express-session')({
    secret: '70560fad5d277d364272f95bea941e786759739a6287971286b5d7d43b0c55a041eaa446b2a2f433243c8c3171ff0d3e08d7e92850b724b783ff3fae2f2e26a0',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/waitlist_entries/', waitlistEntries);

app.get('/seed', require('./routes/seeds'));
app.get('/something_bogus', function(req, res, next) {
  res.send({status: "alive"});
});
app.get('/local_redirect', function(req, res, next) {
  res.location('/waitlist_entries?_utm=redacted');
  res.redirect('/waitlist_entries?_utm=redacted');
});
app.get('/external_redirect', function(req, res, next) {
  res.location('http://www.google.com/?_utm=redacted');
  res.redirect('http://www.google.com/?_utm=redacted');
});

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://mongodbhost/ejs_waitlist_dev');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
