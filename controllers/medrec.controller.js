const MedRecord = require("../schemas/medrec.schema");
const {jsonResponse} = require("../utilities/jsonResponse");

class MedicalRecordController{

    /**
     * ### Description
     * Gets all records found in the database. 
     */
    static getAllRecords = async (req, res, next)=>{
        try{
            if(req.query.patient_id){
                return this.getAllPatientsByDoctor(req, res, next)
            }
            let records = MedRecord.find();
            return jsonResponse(res, 200, "Success", records);   

        }catch(error){
            return jsonResponse(res, 200, "Failed", error.message)
        }

    }
    /**
     * ### Description
     * Gets a single medical record by it's ID that is passed in the url.
     */
     static getRecordById = async(req, res, next) =>{
        try{
            let id = req.params.id;
            let record = await MedRecord.findById(id);y
            if(!record) throw new Error("No record was found for with this ")
            return jsonResponse(res, 200, "Success", "Successfully retrieved record", record);
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message)
        }

    }
    /**
     * ### Description
     * Finds a record by the ID that is found in the url then updates the record with the data that is sent in the request's body.
     */
    static updateRecord = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let data = req.body;
            if(Object.key(data).length < 1) throw new Error("No data was sent to update the record");
            let record = await MedRecord.findByIdAndUpdate(id, req.body, {new: true});
            if(!record) throw new Error("No record was found for this id")
            return jsonResponse(res, 200, "Success", "Successfully", record);
        }catch(error){
            return jsonResponse(res, 500, "Failed", error.message)
        }

    }
    /**
     * ### Description
     * Deletes a record that matches the id that is passed in the url.
     */
     static deleteRecord = async(req, res, next)=>{
        try{
            let id = req.params.id;
            let record = await  MedRecord.findByIdAndDelete(id);
            if(!record) throw new Error("No record was found for this id")
            return jsonResponse(res,200, "Success","Successfully deleted record")
        }catch(error){
            return jsonResponse(res, 500, "Failed", error.message);
        }

    }
    /**
     * ### Description
     * Creates a record with the data that is passed in the body of the request.
     */
    static createRecord = async(req, res, next) =>{
        try{
            let data = req.body;
            if(Object.keys(data).length < 1) throw new Error("No data was found to create record");
            let record = await new MedRecord(req.body).save();
            return jsonResponse(res, 200, "Success","Successfully created Record", record)
        }catch(error){
            return jsonResponse(res, 500, "Failed", error.message);
        }

    }

    static getAllRecordByPatient = async(req, res, next) =>{
        try{
            let admit_doctor = req.params.patient_id;
            if(admit_doctor){
                let records = await MedRecord.find({patient: patient_id});
                return jsonResponse(res, 200, "Success","Succesfully retrieved records", records);
            }
            return jsonResponse(res,500, "Failed", "Server error");
        
        }catch(error){
            return jsonResponse(res, 500, "Failed", error.message);
        }
    }
    
}

module.exports = MedicalRecordController;