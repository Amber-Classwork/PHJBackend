const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    fname: {type:String, required:[true, "First name is a required field"]},
    lname: {type:String, required:[true, "Last name is a required field"]},
    title:{type: String},
    imageUrl: {type: String},
    email:{type:String, unique:true, lowercase:true},
    phone: {
        type:String, 
        // makes the phone field required if the email field is empty.
        required: [function (){
            return !this.email;
        }, "Please provide an phone number if you won't provide an email"]},
    username: {type: String, unique: true, required: true},
    address:{
        street: {type: String},
        city:{type: String},
        parish:{type: String},
    },
    password: {type:String, required:[true, "A password is needed, Please provide a password"]},

}, {timestamps:true});


// When user is saved the middleware will hash the password that is on the document.
userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 12);
    next();
});


// The function below will return true or false if the password matches but wrapped in a promise
userSchema.method("passwordCorrect", async function(password){
    return await bcrypt.compare(password, this.password);
});


module.exports = mongoose.model('User',userSchema);