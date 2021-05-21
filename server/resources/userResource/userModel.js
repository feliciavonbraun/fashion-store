const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String},
    adminRequest: {type: Boolean, required: true}
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;