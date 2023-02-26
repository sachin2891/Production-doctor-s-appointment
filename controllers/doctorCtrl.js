const doctorModel = require('../models/doctorModel')
const appointmentsModel = require('../models/appointmentModel');
const userModel = require('../models/userModels');
const getDoctorInfoController = async (req, res) => {

    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            message: "Doctor data fetch success",
            data: doctor
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Fetching Doctor Information"
        })

    }

}
//Update doctor profile
const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
        res.status(200).send({
            success: true,
            message: "Doctor data updated successfully",
            data: doctor
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating Doctor Info"
        })

    }


}
const getDoctorByIdController = async (req, res) => {

    try {
        const doctor = await doctorModel.findById({ _id: req.body.doctorId });
        res.status(200).send({
            success: true,
            message: "Single Doctor data fetched",
            data: doctor
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while fetching Single Doctor Info"
        })

    }
}
const doctorAppointmentsController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        const appointments = await appointmentsModel.find({
            doctorId: doctor._id,
        });
        res.status(200).send({
            success: true,
            message: "Doctor Appointments fetched successfully",
            data: appointments
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while fetching Doctor Appointments"
        })

    }
}
const updateStatusController = async (req, res) => {
    try {
        const { appointmentsId, status } = req.body;
        const appointments = await appointmentsModel.findByIdAndUpdate(
            appointmentsId, { status });
        const user = await userModel.findOne({ _id: appointments.userId });
        const notification = user.notification;
        notification.push({
            type: "Status Updated",
            message: `Your appointment has been updated ${status}`,
            onClickPath: "/user/doctor-appointments"
        })
        await user.save();
        res.status(200).send({
            success: true,
            message: "Appointment Updated Successfully",

        });



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating  Status"
        })

    }

}
module.exports = {
    getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController,
    doctorAppointmentsController,
    updateStatusController
};