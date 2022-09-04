const MedRecord = require("../schemas/medrec.schema");

class MedicalRecordController{

    /**
     * ### Description
     * Gets all records found in the database. 
     */
    static async getAllRecords(req, res, next){
        try{
            let records = MedRecord.find();
            res.status(200).json({
                status:"success",
                data: {
                    records
                },
            })
        }catch(error){
            res.status(404).json({
                status:"Failed",
                message: error.message
            })
        }

    }
    /**
     * ### Description
     * Gets a single medical record by it's ID that is passed in the url.
     */
     static async getRecordById(req, res, next){
        try{
            let id = req.params.id;
            let record = await MedRecord.findById(id);
            res.status(200).json({
                status:"success",
                data: {
                    record
                },
            })
        }catch(error){
            res.status(404).json({
                status:"Failed",
                message: error.message
            })
        }

    }
    /**
     * ### Description
     * Finds a record by the ID that is found in the url then updates the record with the data that is sent in the request's body.
     */
    static async updateRecord(req, res, next){
        try{
            let id = req.params.id;
            let record = await MedRecord.findByIdAndUpdate(id, req.body, {new: true});
            res.status(200).json({
                status:"Success",

                data: {
                    record
                },
            })
        }catch(error){
            res.status(404).json({
                status:"Failed",
                message: error.message
            })
        }

    }
    /**
     * ### Description
     * Deletes a record that matches the id that is passed in the url.
     */
     static async deleteRecord(req, res, next){
        try{
            let id = req.params.id;
            await  MedRecord.findByIdAndDelete(id);
            res.status(200).json({
                status:"Success",
            })
        }catch(error){
            res.status(404).json({
                status:"Failed",
                message: error.message
            })
        }

    }
    /**
     * ### Description
     * Creates a record with the data that is passed in the body of the request.
     */
    static async createRecord(req, res, next){
        try{
            let record = await new MedRecord(req.body).save();
            res.status(200).json({
                status:"success",
                data: {
                    record
                },
            })
        }catch(error){
            res.status(404).json({
                status:"Failed",
                message: error.message
            })
        }

    }
    
}

module.exports = MedicalRecordController;