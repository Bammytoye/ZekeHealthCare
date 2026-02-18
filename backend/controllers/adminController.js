import validator from 'validator';
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js'


//api for adding doctors
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        console.log({ password, speciality, degree, experience, about, fees, address }, imageFile)
        //check all data to add doctor into database
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: 'Missing Details, Try Again' })
        }

        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter valid email!' })
        }

        //validating for password
        if (password.length < 8) {
            return res.json({ success: false, message: 'Enter a strong password' })
        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload file or image into cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: 'New Doctor Added' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//API FOR ADMIN LOGIN
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to get all  doctors list for admin dashboard
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to get all appointment
const appointmentAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for appointment cancellation
const cancelAppointmentByAdmin = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        if (!appointmentId) {
            return res.json({ success: false, message: "Appointment ID is required" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Release doctor slot
        const { docId, slotDate, slotTime } = appointmentData;

        const doctorData = await doctorModel.findById(docId);

        if (doctorData) {
            const slots_booked = doctorData.slots_booked;

            if (slots_booked[slotDate]) {
                slots_booked[slotDate] = slots_booked[slotDate].filter(
                    slot => slot !== slotTime
                );
            }

            await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        }

        res.json({ success: true, message: "Appointment Cancelled" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//api to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashboardData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0.5)
        }

        res.json({ success: true, dashboardData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { addDoctor, loginAdmin, allDoctors, appointmentAdmin, cancelAppointmentByAdmin, adminDashboard }