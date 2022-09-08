const router = require("express").Router();
const UsersController = require("../controllers/users.controller");
const { uploadFileToS3 } = require("../utilities/s3");

router
    .route("/")
    .get(UsersController.getAllUsers)
    .post(UsersController.createUser)

router
    .route("/:id")
    .get(UsersController.getUserById)
    .patch(uploadFileToS3.single("imageUrl"),UsersController.updateUser)

    .delete(UsersController.deleteUser)

router
    .route("/login")
    .post(UsersController.loginUser)

module.exports = router;