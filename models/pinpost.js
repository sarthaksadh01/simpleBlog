let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pinpost = new Schema({
    title:  String,
    summary: String,
    full_text:   String,
    photo: String,  
  });
  module.exports = mongoose.model('Pinpost', pinpost);