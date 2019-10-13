const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    balance: {type: Number, default: 0},
    admin: {type: Boolean, default: false},
    token: {type: String, default: ""}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
