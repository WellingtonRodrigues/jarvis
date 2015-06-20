var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, minlength: 5, maxlength: 100, required: true},
    name: { type: String, minlength: 3, maxlength: 100, required: true },
    password: { type: String, minlength: 5, maxlength: 128, required: true },
    roles: { type: String, enum: ['student', 'professor', 'admin'], required: true },
    createdAt: { type: Date, default: Date.now, required: true }
});

var UserModel = mongoose.model('User', userSchema, 'users');

module.exports = UserModel;
