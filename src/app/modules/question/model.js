var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  description: { type: String, minlength: 5, maxlength: 100, required: true },
  statement: { type: String, minlength: 5, maxlength: 100, required: true },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  choices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Choice' }]
});

var QuestionModel = mongoose.model('Question', questionSchema, 'questions');

module.exports = QuestionModel;
