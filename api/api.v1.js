const router = require("express").Router();
const patientsRouter = require("../routes/patients.routes");
const appointmentsRouter = require("../routes/appointments.routes");
const usersRouter = require("../routes/users.routes");
const doctorsRouter = require("../routes/doctors.routes");
const recordsRouter = require("../routes/medrec.routes");


router.get("/", (req, res)=>{
    res.status(200).json({
        routeList: {
            "/patients": {
                info: "Has information about patients that are in the system",
                operations: ["GET", "POST", "PATCH", "DELETE"]
            },
            "/users": {
                info: "Has information about users that are able to sign up and manage other features of the application",
                operations: ["GET", "POST", "PATCH", "DELETE"]
            },
            "/doctors": {
                info: "Similar to users however they have more control over the application and user",
                operations: ["GET", "POST", "PATCH", "DELETE"]
            },
            "/appointments": {
                info: "This resource manages the appointment created by either user or doctor",
                operations: ["GET", "POST", "PATCH", "DELETE"]
            },
        }
    })
});
router.use("/patients/",patientsRouter);
router.use("/users/", usersRouter);
router.use("/doctors/", doctorsRouter);
router.use("/records/", recordsRouter);
router.use("/appointments/", appointmentsRouter)

module.exports = router