const router = require("express").Router()
const MedicalRecordController = require("../controllers/medrec.controller")

router
    .route("/")
    .get(MedicalRecordController.getAllRecords)
    .post(MedicalRecordController.createRecord)

router
    .route("/:id")
    .get(MedicalRecordController.getRecordById)
    .patch(MedicalRecordController.updateRecord)
    .delete(MedicalRecordController.deleteRecord)



module.exports = router;