const router = require("express").Router();
const AppointmentController = require("../controllers/appointments.controller");


// router.param(":id", (req,res, next,id)=>{
//     console.log(id);
//     next();
// });


router
    .route("/")
    .get(AppointmentController.getAllAppointments)
    .post(AppointmentController.createAppointment);

router
    .route("/:id")
    .get(AppointmentController.getSingleAppointment)
    .patch(AppointmentController.updateAppointment)
    // .put(PatientsController.updateAppointment)
    .delete(AppointmentController.deleteAppointment)





module.exports = router