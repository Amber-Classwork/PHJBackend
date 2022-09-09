const Doctor = require("../schemas/doctor.schema");
const bcrypt = require("bcrypt");
const {jsonResponse} = require("../utilities/jsonResponse");
const { generateJWTToken } = require("../utilities/tokenGenerator");
/**
 * ### Description
 * Contains all the controllers for the doctors schema
 */
class DoctorsController{
    /**
     * ### Description
     * Authenticates the doctor that is passed in the body of the request. 
     */
    
    static loginDoctor = async (req,res, next)=>{
        try{
            let data = req.body;
            let email = data.email;
            let password = data.password;
            let doctor = await Doctor.findOne({"email": email});
            if(doctor){
                let isAuthenticated = await bcrypt.compare(password,doctor.password)
                if(isAuthenticated){
                    let token = generateJWTToken({_id:doctor._id,username:doctor.username, email: doctor.email, role:"doctor"},"3600")

                    let data = {
                        user,
                        token
                    }
                    return jsonResponse(res,200,"Success","Successfully Logged in",data);
                }
                return jsonResponse(res,401,"Failed","Credentials are Incorrect");
            }
            return jsonResponse(res,401,"Failed","User not Found");
        }catch(error){
            jsonResponse(res, 400,"Failed", error.message);
        }
    }
    /**
     * ### Description
     * Gets all the doctors that are saved in the database.
     */
    static getAllDoctors = async (req, res, next)=>{
        try{
            if(req.query.department){
                return this.getAllDoctorsByDepartment(req,res,next);
            }
            let doctors = await Doctor.find();

            return jsonResponse(res,200, "Success", "Successfully retrieved", doctors)

        }catch(error){
            return jsonResponse(res, 400, "Failed", error.message);
        }
    }

    /**
     * ### Description
     * Gets a single doctor which matches the id that was passed in the url
     */
     static getDoctorById = async (req, res, next)=>{
        try{
            let id = req.params.id;
            let doctor = await Doctor.findById(id);
            return jsonResponse(res, 200,"Success", "Successfully retrieved", doctor)
        }catch(error){
            jsonResponse(res, 500, "Failed", error.message)
        }
    }
    /**
     * ### Description
     * Updates the doctor with the data that is passed to the request in the body.
     */
     static updateDoctorById = async (req, res, next)=>{
        try{
            let id = req.params.id;
            let data = req.body;
            if(Object.keys(data).length < 1){
                throw new Error("No data to update the doctor with")
            }
            data.address = {street: data.street, city: data.city, parish: data.parish};

            let doctor = await Doctor.findByIdAndUpdate(id, data, {new:true});
            
            jsonResponse(res, 200,"Success", "Successfully updated", doctor)
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message);
        }
    }
        /**
     * ### Description
     * Delete the doctor that matches the id that is passed in the url
     */
         static deleteDoctorById = async (req, res, next) =>{
            try{
                let id = req.params.id;
                let doctor = await Doctor.findByIdAndDelete(id);
                if(!doctor){
                    throw new Error("No doctor was found to delete")
                }
                jsonResponse(res,200, "Success", "Successfully Deleted", doctor)
            }catch(error){
                jsonResponse(res, 400, "Failed", error.message)
            }
        }
        /**
     * ### Description
     * Creates a new Doctor from the data that is passed in the request body. 
     */
         static createDoctor =  async (req, res, next)=>{
            try{
                let data = req.body;
                if(Object.keys(data).length < 1){
                    throw new Error("No data passed in the request body");
                }
                data.imageUrl = (req.file) ? req.file.location : undefined;

                data.address = {street: data.street, city: data.city, parish: data.parish};

                let doctor = new Doctor(data);
                if(!doctor.password){
                    doctor.password = (doctor.fname.slice(0,1)+"."+ doctor.lname).toUpperCase()
                }
                
                doctor.password = await bcrypt.hash(doctor.password, 10);
                await doctor.save()
                return jsonResponse(res, 200, "Success", "Successfully created doctor", doctor)
            }catch(error){
                jsonResponse(res, 400, "Failed", error.message);
            }
        }

        static getAllDoctorsByDepartment = async (req,res,next) =>{
            try{
                const department = req.query.department;
                if(department){
                    let doctors = await Doctor.find({"department":department})
                    return jsonResponse(res, 200, "Success", "Successfully Retrieved", doctors)
                }
                return jsonResponse(res,404, "Failed", "No department was specified");
            }catch(error){
                jsonResponse(res, 400, "Failed", error.message);
            }
        }
}

module.exports = DoctorsController;