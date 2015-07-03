var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionCategorySchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

var QuestionCategoryModel = mongoose.model('QuestionCategory', questionCategorySchema);

module.exports = QuestionCategoryModel;
