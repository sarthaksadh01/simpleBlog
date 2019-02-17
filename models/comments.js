let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var comments = new Schema({
    text:  String,
    user_name: String,
    date:Date, 
    post_id:String,
    user_photo:String
  });
  module.exports = mongoose.model('Comments', comments)