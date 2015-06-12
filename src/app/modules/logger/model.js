var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loggerSchema = new Schema({
  level: { type: String, required: true, enum: ['info', 'warning', 'error'] },
  message: { type: String, required: true},
  createdAt: { type: Date, default: Date.now }
});

var LoggerModel = mongoose.model('Logger', loggerSchema, 'log');

module.exports = LoggerModel;
