let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var posts = new Schema({
    title:  String,
    summary: String,
    full_text:   String,
    photo: String,
    date:Date,   
  });
  module.exports = mongoose.model('Posts', posts)