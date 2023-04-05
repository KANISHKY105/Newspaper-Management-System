const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');  // auth section
const passportLocalMongoose = require("passport-local-mongoose");

// const encrypt = require('mongoose-encryption');


const adminSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: [false, "email must be provided"],
        unique: false
    },
    password: {
        type: String,
        required: [false, "password must be provided"],
    },
    isAdmin: {
        type: Boolean,
        default: true,
    }
    
});

adminSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('Admin', adminSchema);