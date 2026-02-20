import doctorModel from "../models/doctorModel.js"
import appointmentModel from '../models/appointmentModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const changeAvailability = async (req, res) => {
    try {
        const { doctorId } = req.body
        const doctorData = await doctorModel.findById(doctorId)
        await doctorModel.findByIdAndUpdate(doctorId, { available: !doctorData.available })
        res.json({ success: true, message: 'Doctor availability updated' })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctorsData = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctorsData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: 'Invalid Credentials' })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Invalid Credentials' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to get doctor appointments for doctor models
const appointmentDoctor = async (req, res) => {
    try {
        const docId = req.docId

        const appointments = await appointmentModel
            .find({ docId })
            .sort({ createdAt: -1 })

        res.json({
            success: true,
            appointments
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const appointmentComplete = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const docId = req.docId

        const appointment = await appointmentModel.findById(appointmentId)

        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" })
        }

        if (appointment.docId.toString() !== docId) {
            return res.json({ success: false, message: "Unauthorized action" })
        }

        if (appointment.cancelled) {
            return res.json({ success: false, message: "Cannot complete cancelled appointment" })
        }

        if (appointment.isCompleted) {
            return res.json({ success: false, message: "Already completed" })
        }

        appointment.isCompleted = true
        await appointment.save()

        res.json({ success: true, message: "Appointment marked as completed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const docId = req.docId

        const appointment = await appointmentModel.findById(appointmentId)

        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" })
        }

        if (appointment.docId.toString() !== docId) {
            return res.json({ success: false, message: "Unauthorized action" })
        }

        if (appointment.cancelled) {
            return res.json({ success: false, message: "Already cancelled" })
        }

        if (appointment.isCompleted) {
            return res.json({ success: false, message: "Cannot cancel completed appointment" })
        }

        appointment.cancelled = true
        await appointment.save()

        res.json({ success: true, message: "Appointment cancelled" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to get dashboard data to doctor panel
const doctorDashboard = async (req, res) => {
    try {
        const docId = req.docId

        // Get all appointments for this doctor
        const appointments = await appointmentModel
            .find({ docId })
            .sort({ createdAt: -1 }) // newest first

        // Unique patients count
        const patients = [...new Set(appointments.map(item => item.userId))]

        // Calculate total earnings (only completed & not cancelled)
        const earning = appointments.reduce((total, item) => {
            if (item.isCompleted && !item.cancelled) {
                return total + item.amount
            }
            return total
        }, 0)

        const dashData = {
            earning,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.slice(0, 5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to get doctor profile
const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId
        const profileData = await doctorModel.findById(docId).select('-password')
        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api tp update doctor 
const updateProfile = async (req, res) => {
    try {
        const docId = req.docId; // from auth middleware
        const { about, fees, address, available } = req.body;

        const updatedProfile = await doctorModel.findByIdAndUpdate(
            docId,
            { about, fees, address, available },
            { new: true }
        );

        res.json({ success: true, profileData: updatedProfile });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export { changeAvailability, doctorProfile, updateProfile, doctorList, doctorLogin, appointmentDoctor, appointmentComplete, doctorDashboard, appointmentCancel }