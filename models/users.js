let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var users = new Schema({
    name:  String,
    email: String,
    photo: String
  });
  module.exports = mongoose.model('Users', users)