'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WaitlistEntrySchema = new Schema({
  email: { type: String, required: true, unique: true },
  created_at: Date,
  updated_at: Date
});

WaitlistEntrySchema.path('email').validate(function (email) {
  return email.length;
}, 'Email cannot be blank');

WaitlistEntrySchema.pre('save', function(next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

module.exports = mongoose.model('WaitlistEntry', WaitlistEntrySchema);
