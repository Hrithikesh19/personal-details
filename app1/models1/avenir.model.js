const mongoose = require('mongoose');

const avenir_info = mongoose.Schema({
    Name: String,
    Account_Name : String,
    Email: String,
    Phonenumber : String,

}, {
    timestamps: false
}
);

module.exports = mongoose.model('avenir', avenir_info);