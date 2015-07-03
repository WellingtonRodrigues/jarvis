var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: { type: String, minlength: 5, maxlength: 50, required: true }
});

var CategoryModel = mongoose.model('Category', categorySchema, 'categories');

module.exports = CategoryModel;