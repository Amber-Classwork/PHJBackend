const { Schema, model } = require("mongoose");

let medRecord = new Schema({
    patient: {type: Schema.Types.ObjectId, ref:"Patient"},
    complaint:{type: String},
    diagnosis: {type: String},
    comments: [{
        comment:{type: String},
        date: {type: Date, default: ()=> new Date()}
    }],
    prescription: {type:String}

}, {timestamps: true})


module.exports = model("MedRecord", medRecord);