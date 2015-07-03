var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionAnswerSchema = new Schema({
  title: { type: String, required: true },
  score: { type: Number, required: true, min: 0, max: 1 } // Percentage between 0 and 1
});

var questionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  _category: { type: Number, ref: 'QuestionCategory' },
  answers: [questionAnswerSchema]
});

var QuestionModel = mongoose.model('Question', questionSchema, 'questions');

module.exports = QuestionModel;
