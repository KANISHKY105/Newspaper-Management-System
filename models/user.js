const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');  // auth section
const passportLocalMongoose = require("passport-local-mongoose");

// const encrypt = require('mongoose-encryption');


const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: [false, "email must be provided"],
        unique: true,
    },
    password: {
        type: String,
        required: [false, "password must be provided"],
    },
    
});

userSchema.plugin(passportLocalMongoose);



// var secret = process.env.SECRET;
// userSchema.plugin(encrypt, { secret: secret , encryptedFields: ['password']});


module.exports = mongoose.model('User', userSchema);


