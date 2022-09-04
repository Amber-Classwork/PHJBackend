const router = require("express").Router();
const DoctorsController = require("../controllers/doctors.controllers");

router
    .route("/")
    .get(DoctorsController.getAllDoctors)
    .post(DoctorsController.createDoctor)

router
    .route("/:id")
    .get(DoctorsController.getDoctorById)
    .patch(DoctorsController.updateDoctorById)
    .delete(DoctorsController.deleteDoctorById)

router
    .route("/login")
    .post(DoctorsController.loginDoctor)

module.exports = router;