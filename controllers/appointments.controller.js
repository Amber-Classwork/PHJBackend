const { isValidObjectId } = require("mongoose");
const Appointment = require("../schemas/appointment.schema");
const {ObjectId} = require("mongoose").Types;
const {jsonResponse} = require("../utilities/jsonResponse");
class AppointmentController{

        /**
     * ### Description
     * Gets all the Appointment from the database
     * 
     */
    static  getAllAppointments = async(req, res, next) =>{
        try{
            let query = req.query.userId;
            if(query){
                return this.getAppointmentsByUID(req, res, next);
            }
            let appointments = await Appointment.find();
            jsonResponse(res, 200, "Success", "Successfully Retrieved", appointments);
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message)
        }
    }
    /**
     * ### Description
     * Gets a singles appointment from the database where it matches the id that is found in the request parameters
     * 
     */
    static getSingleAppointment = async(req, res, next) =>{
        try{
            let id = req.params.id;
            let appointment = await Appointment.findById(id);
            if(appointment){
                return jsonResponse(res, 200, "Success", "Successfully Retrieved", appointment);
            }
            return jsonResponse(res, 400, "Failed","No user exist with that information");
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message)
        }
    }
        /**
     * ### Description
     * Creates a single appointment with the data that is submitted in the request body
     */
    static createAppointment = async(req, res, next)=>{
        try{
            let data = req.body;
            data.doctor = ObjectId(data.doctor);
            if(!data.userId){
                data.userId = new ObjectId();
            }else{
                data.userId = ObjectId(data.userId);
            }
            let newAppointment = await new Appointment(data).save();
            jsonResponse(res, 200, "Success", "Successfully Created Appointment", newAppointment);
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message)
        }
    }
        /**
     * ### Description
     * Updates the Appointment with the data that is passed in the request body, and identifies the patient by the id passed in the request parameters
     */
    static updateAppointment = async(req,res, next) =>{
        try{
           let id = req.params.id;
           let data = req.body;
           if(Object.keys(req.body).length == 0){
            return res.json({message: "There is no data passed to update the patient "})
           }else{
                data = {street: data.street, city: data.city, parish: data.parish};

                let appointment = await Appointment.findByIdAndUpdate(id,data)
                jsonResponse(res, 200, "Success", "Successfully Updated", appointment);
            }
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message)
        }


    }
    /**
     * ### Description
     * Deletes the Appointment that matches the id that is passed in the request url.
     */
    static deleteAppointment = async(req,res, next)=>{
        try{
            let id = req.params.id;
            let count = await Appointment.findByIdAndDelete(id);
            jsonResponse(res, 200, "Success", "Successfully Deleted");
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message)
        }
    }

    static getAppointmentsByEmail = async(req, res, next) =>{
        try{
            let email = req.query.email;
            console.log(email);
            if(email){

                let appointments = await Appointment.find({"email": email});
                console.log(appointments);
                return jsonResponse(res, 200, "Success", "Successfully",appointments);
            }
        }catch(error){
            return jsonResponse(res, 400, "Failed", error.message);
        }
    }
    static getAppointmentsByUID = async(req, res, next) =>{
        try{
            let id = req.query.userId;
            if(id){

                let appointments = await Appointment.find({"userId": id});
                return jsonResponse(res, 200, "Success", "Successfully",appointments);
            }
        }catch(error){
            return jsonResponse(res, 400, "Failed", error.message);
        }
    }
}
module.exports = AppointmentController;