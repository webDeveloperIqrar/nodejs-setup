var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    user_type: {
        type: String,
        require: true
    },
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    email_verified: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        require: true
    },
    forgot_password_token: {
        type: String,
        default: ''
    },
    phone: {
        type: Number,
        // min:10,
        // max:13,
    },
    country_code: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    zipcode: {
        type: String,
         default: ''
    },
    country: {
        type: String,
        default: ''
    },
    timezone: {
        type: String,
        default: ''
    },
    ip: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        require: true,
        default: 1
    },
    created_at: {
        type : Date,
        default: Date.now()
    },
    updated_at: {
        type : Date,
        default: Date.now()
    },
});
var user = new mongoose.model('User', schema);
module.exports = user;