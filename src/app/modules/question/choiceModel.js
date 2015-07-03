var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var choiceSchema = new Schema({
  statement: { type: String, minlength: 5, maxlength: 100, required: true },
  fraction: { type: Number, min: 0, max: 100, required: true }
});

var ChoiceModel = mongoose.model('Choice', choiceSchema, 'choices');

module.exports = ChoiceModel;