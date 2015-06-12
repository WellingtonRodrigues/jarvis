var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  level: { type: String, required: true, enum: ['info', 'warning', 'error'] },
  message: { type: String, required: true},
  createdAt: { type: Date, default: Date.now }
});

var QuestionModel = mongoose.model('Question', questionSchema, 'questions');

module.exports = QuestionModel;
