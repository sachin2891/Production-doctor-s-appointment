const express = require("express");
const { getAllDoctorsContoller, getAllUsersContoller, changeAccountStatusController } = require("../controllers/adminCtrl");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

//get All Users
router.get("/getAllUsers", authMiddleware, getAllUsersContoller)


// get All Doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctorsContoller)

//Post Account  Status
router.post("/changeAccountStatus", authMiddleware, changeAccountStatusController);
module.exports = router;
