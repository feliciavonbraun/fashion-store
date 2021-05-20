const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String},
    role: {type: String},
    isLoggedIn: {type: Boolean},
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;