const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')


const getAllUsersContoller = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send({
            success: true,
            message: "users list fetched successfully",
            data: users,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: true,
            message: "error while getting users",
            error,
        });

    }

}
const getAllDoctorsContoller = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({
            success: true,
            message: "doctors list fetched successfully",
            data: doctors,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: true,
            message: "error while getting Docots",
            error,
        });
    }

}
// Doctor Account status 
const changeAccountStatusController = async (req, res) => {
    try {
        const { doctorId, status } = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
        const user = await userModel.findOne({ _id: doctor.userId });
        const notification = user.notification
        notification.push({
            type: 'doctor-account-request-updated',
            message: `Your Account  Request Has ${status}`,
            onClikcpath: './notification'
        })
        user.isDoctor = status === "approved" ? true : false;

        await user.save();
        res.status(201).send({
            success: true,
            message: "doctor account status updated successfully",
            data: doctor,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while changing account status",
            error,
        });

    }


}

module.exports = {
    getAllUsersContoller,
    getAllDoctorsContoller,
    changeAccountStatusController
}