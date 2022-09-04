const router = require("express").Router();
const PatientsController = require("../controllers/patients.controller");


// router.param(":id", (req,res, next,id)=>{
//     console.log(id);
//     next();
// });


router
    .route("/")
    .get(PatientsController.getAllPatients)
    .post(PatientsController.createPatient);

router
    .route("/:id")
    .get(PatientsController.getSinglePatient)
    .patch(PatientsController.updatePatient)
    // .put(PatientsController.updatePatient)
    .delete(PatientsController.deletePatient)





module.exports = router