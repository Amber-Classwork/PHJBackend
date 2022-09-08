const { Schema, model } = require("mongoose");


let patientSchema = new Schema({
    fname: {type:String},
    lname: {type: String},
    mname:{type: String},
    email: {type: String},
    DOB: {type: Date},
    patientImage: {type:String},
    guardian_fname:{type:String},
    guardian_lname:{type:String},
    guardian_address:[{
        street: {type:String},
        city:{type:String},
        parish: {type:String}
    }],
    phone: {type:String},
    gender:{type:String},
    allergies: {type:String},
    nationality:{type:String},
    admission_date:{type: String},
    admit_doctor: {type:Schema.Types.ObjectId, ref:"Doctor"},

}, {timestamps:true});
// Will create timestamps for the createdAt and updatedAt time;

module.exports = model("Patient", patientSchema);