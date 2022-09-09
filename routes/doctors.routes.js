const router = require("express").Router();
const DoctorsController = require("../controllers/doctors.controllers");
const uploadFileToS3 = require("../utilities/s3");
router
    .route("/")
    .get(DoctorsController.getAllDoctors)
    .post(uploadFileToS3.single("imageUrl"),DoctorsController.createDoctor)

router
    .route("/:id")
    .get(DoctorsController.getDoctorById)
    .patch(DoctorsController.updateDoctorById)
    .delete(DoctorsController.deleteDoctorById)

router
    .route("/login")
    .post(DoctorsController.loginDoctor)

module.exports = router;