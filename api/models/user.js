const mongoose  = require('mongoose');

// Creating Schema
const userSchema = mongoose.Schema({
    // format of mongoose Schema
    _id: mongoose.Schema.Types.ObjectId,
    //Creating object with email and password 
    email: { 
        type: String,
        required: true,
        unique:  true, 
        // regular expression for validating email
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password: {type: String, required: true }
});

// model function takes two arguments name schema
module.exports = mongoose.model('User', userSchema);