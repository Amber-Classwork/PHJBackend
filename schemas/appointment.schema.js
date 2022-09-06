const { Schema, model } = require("mongoose");


let appointmentSchema = new Schema({
    doctor:{type: Schema.Types.ObjectId, ref:"Doctor", required:[true, "There must be a Doctor assigned to the appointment"]},
    visitStart: {type:Date, required: [true, "Please provide a visit time"]},
    guardian:{type:String},
    notes:{type:String},
    fname: {type:String, required:[true, "Please provide First Name"]},
    lname: {type:String, required:[true, "Please provide First Name"]},
    email: {type:String, required:[true, "Please provide Email"]},
    gender: {
        type:String,
        required: [function(){
            return !this.email
        }, "No email detected, Please provide email"]
     },
    phone:{type:String},
    userId: {type: Schema.Types.ObjectId},
    status: {type:Boolean, default:false},
}, {timestamps:true});
// Will create timestamps for the createdAt and updatedAt time;

module.exports = model("Appointment", appointmentSchema);