let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var carousel = new Schema({
    title:  String,
    full_text:   String,
    photo: String,  
  });
  module.exports = mongoose.model('Carousel', carousel);