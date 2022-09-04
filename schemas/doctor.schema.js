const mongoose = require('mongoose');


const doctorSchema = mongoose.Schema({
    fname: {type:String, required:true},
    lname: {type:String, required:true},
    title:{type: String},
    gender:{type: String},
    imageUrl: {type: String},
    email:{type:String, unique:true, lowercase:true},
    phone: {type:String, required:true},
    department:{
        type:String,
        uppercase:true,
        required:[true, "Doctor must be apart of a department"], 
        enum:{
            values:["SURGEON", "DENTISTRY", "RADIOLOGY","CARDIOLOGY", "DERMATOLOGY","OPTHALMOLOGY", "NEUROLOGY", "EMERGENCY" ],
            message: '{VALUE} is not a valid department, valid departments are: ["SURGEON", "DENTISTRY", "RADIOLOGY","CARDIOLOGY", "DERMATOLOGY","OPTHALMOLOGY", "NEUROLOGY", "EMERGENCY" ]'
        }
    },
    username: {type: String, unique: true, required: true},
    address:{
        street: {type: String},
        city:{type: String},
        parish:{type: String},
    },
    patientCount:{type:Number, default:0},
    experience: {type: Number, default: 5, min:[5, "You should have atleast 5 years of experience"]},
    status: {
        type: String, 
        enum:{
            values: ["AVAILABLE", "IN MEETING", "BUSY", "UNAVAILABLE"], 
            message: "{VALUE} should be 'AVAILABLE','IN MEETING','BUSY','UNAVAILABLE'"
            },
        default: "AVAILABLE"},
    password: {type:String, required:[true,"password field should not be empty"]},
    rating: {type:Number, default: 5, max:[5, "Rating cannot be more than 5"]},
    isSuperAdmin: {type:Boolean, default:false}

}, {timestamps:true});

module.exports = mongoose.model('Doctor',doctorSchema);