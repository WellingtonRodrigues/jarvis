var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var questionSchema = mongoose.model('Question').schema;

var testSchema = new Schema({
  name: { type: String, required: true },
  instructions: { type: String, required: true },
  duration: { type: Number }, // In minutes
  password: { type: String },
  networkFilter: { type: String },
  questions: [questionSchema]
});

var TestModel = mongoose.model('Test', testSchema, 'tests');

module.exports = TestModel;
