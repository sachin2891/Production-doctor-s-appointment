const express = require("express");
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController } = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
//login ||post 
router.post("/login", loginController);
router.post("/register", registerController);

// auth ||post
router.post("/getUserData", authMiddleware, authController);
//apply doctor|| post
router.post("/apply-doctor", authMiddleware, applyDoctorController);
//Notification Doctor 
router.post(
    "/get-all-notification",
    authMiddleware,
    getAllNotificationController
);
// delete all notifications
router.post(
    "/delete-all-notification",
    authMiddleware,
    deleteAllNotificationController
);
// get All doc 
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
//Book Appointments
router.post("/book-appointment", authMiddleware, bookAppointmentController);

// Booking availability 
router.post("/booking-availability", authMiddleware, bookingAvailabilityController);

// appointments

router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;