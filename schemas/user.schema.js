const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    fname: {type:String, required:true},
    lname: {type:String, required:true},
    title:{type: String},
    imageUrl: {type: String},
    email:{type:String, unique:true, lowercase:true},
    phone: {type:String, required:true},
    username: {type: String, unique: true, required: true},
    address:{
        street: {type: String},
        city:{type: String},
        parish:{type: String},
    },
    password: {type:String, required:true},

}, {timestamps:true});

module.exports = mongoose.model('User',userSchema);