const Patient = require("../schemas/patient.schema");
const { jsonResponse } = require("../utilities/jsonResponse");
const {ObjectId} = require("mongoose").Types;

class PatientsController{

        /**
     * ### Description
     * Gets all the patients from the database
     * 
     */
    static getAllPatients = async(req, res, next) =>{
        try{
            let patients = await Patient.find();
            return jsonResponse(res, 200, "Success", "Successfully Retrieved", patients);
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message);
        }
    }
    /**
     * ### Description
     * Gets a singles patient from the database where it matches the id that is found in the request parameters
     * 
     */
    static getSinglePatient = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let patient = await Patient.findById(id);
            if(patient){
                return jsonResponse(res, 200, "Success", "Successfully Retrieved", patient);
            }
            return jsonResponse(res,400,"Failed","No user exists with this id");
        }catch(error){
            return jsonResponse(res, 400, "Failed",error.message);
        }
    }
        /**
     * ### Description
     * Creates a single patient with the data that is submitted in the request body
     */
    static createPatient = async(req, res, next)=>{
        try{
            let data = req.body;
            if(Object.keys(data).length < 1){
                throw new Error("No data was sent to create patient")
            }
            let newPatient = await new Patient(data).save();
            jsonResponse(res, 200, "Success", "Successfully Created Patient", newPatient);
        }catch(error){
            jsonResponse(res, 400,"Failed", error.message);
        }
    }
        /**
     * ### Description
     * Updates the patient with the data that is passed in the request body, and identifies the patient by the id passed in the request parameters
     */
    static  updatePatient = async(req,res, next)=>{
        try{
           let id = req.params.id;
           if(Object.keys(req.body).length == 0){
            return jsonResponse(res, 400,"Failed", "There is no data passed to update the patient");
           }else{
                let patient = await Patient.findByIdAndUpdate(id,req.body)
                return jsonResponse(res,200, "Success","Successfully Updated",patient);
            }
        }catch(error){
            return jsonResponse(res, 404, "Failed","Unable to find Patient");
        }


    }
    /**
     * ### Description
     * Deletes the patient that matches the id that is passed in the request url.
     */
    static  deletePatient = async(req,res, next)=>{
        try{
            let id = req.params.id;
            let patient = await Patient.findByIdAndDelete(id);
            if(!patient) throw new Error("Patient does not exist");
            return jsonResponse(res, 200, "Success","Patient deleted")
        }catch(error){
            return jsonResponse(res,404,"Failed", error.message)
        }
    }

    
    static getPatientsByDoctor = async (req, res, next) =>{
        try{
            let doctor = req.query.admit_doctor;

            if(doctor){
                let patients = await Patient.find({admit_doctor: req.query.admit_doctor});
                return jsonResponse(res, 200, "Success",patients);
            }
            return jsonResponse(res,404,"Failed","No doctor was specified")
        }catch(error){
            return jsonReqponse(res, 400, "Failed", error.message);
        }
    }
}
module.exports = PatientsController;