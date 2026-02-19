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
        const doctor = await doctorModel.findOne({email})

        if (!doctor) {
            return res.json({success: false, message: 'Invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id:doctor._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success:false, message: 'Invalid Credentials'})
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
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { changeAvailability, doctorList, doctorLogin, appointmentDoctor }