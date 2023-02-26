const express = require('express');
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController } = require('../controllers/doctorCtrl');
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router();

//Post single doc info

router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);
//POst Update Profile

router.post('/updateProfile', authMiddleware, updateProfileController);
//Post || get Single doc info

router.post('/getDoctorById', authMiddleware, getDoctorByIdController);
//get Appointment info 

router.get('/doctor-appointments', authMiddleware, doctorAppointmentsController);

//POST Update Status

router.post('/update-status', authMiddleware, updateStatusController);
module.exports = router;