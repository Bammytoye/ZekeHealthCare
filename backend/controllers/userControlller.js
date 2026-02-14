import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import Flutterwave from 'flutterwave-node-v3'


//api to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Enter a valid email' })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'Enter a strong password' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
            phone: '',
            gender: '',
            dob: '',
            image: '',
            address: {
                line1: '',
                line2: ''
            }
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }

        const isMatchPassword = await bcrypt.compare(password, user.password)

        if (!isMatchPassword) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to get user profile data
const getProfile = async (req, res) => {
    try {
        const userData = await userModel
            .findById(req.user.id)
            .select('-password')

        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id
        const imageFile = req.file

        // parse FormData fields
        const name = req.body.name || ''
        const phone = req.body.phone || ''
        const dob = req.body.dob || ''
        const gender = req.body.gender || ''
        const address = req.body.address ? JSON.parse(req.body.address) : { line1: '', line2: '' }

        // optional: allow missing fields instead of failing
        const updateData = { name, phone, dob, gender, address }

        // if image uploaded
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            updateData.image = imageUpload.secure_url
        }

        await userModel.findByIdAndUpdate(userId, updateData, { new: true })

        res.json({ success: true, message: "Profile Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime } = req.body
        const userId = req.user.id

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' })
        }

        let slots_booked = docData.slots_booked

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = [slotTime]
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        return res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to get user appointment for frontend my appointment page
const getUserAppointment = async (req, res) => {
    try {
        const userId = req.user.id

        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to cancel appointments
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const userId = req.user.id; // <-- get user from token

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' });
        }

        // Verify appointment user
        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: 'Unauthorized' });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Release doctor slot
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);
        const slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: 'Appointment Cancelled' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//api to make payment of appointment using flutterwave
const flw = new Flutterwave(
    process.env.FLUTWAVE_PUBLIC_KEY,
    process.env.FLUTWAVE_SECRET_KEY
)

const paymentAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData)
            return res.json({ success: false, message: "Appointment not found" })

        if (appointmentData.cancelled)
            return res.json({ success: false, message: "Appointment cancelled" })

        //creating options for flutterwave
        const payload = {
            tx_ref: appointmentId,
            amount: appointmentData.amount,
            currency: process.env.CURRENCY || "NGN",
            redirect_url: "http://localhost:5173/payment-success",
            customer: {
                email: appointmentData.userData.email,
                phonenumber: appointmentData.userData.phone || "08000000000",
                name: appointmentData.userData.name
            },
            customizations: {
                title: "Appointment Payment",
                description: "Payment for doctor appointment"
            }
        }

        //creation of order
        const order = await flw.Payments.create(payload)

        res.json({ success: true, link: order.data.link })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// VERIFY PAYMENT
const verifyPayment = async (req, res) => {
    try {
        const { transaction_id, appointmentId } = req.body

        const response = await flw.Transaction.verify({
            id: transaction_id
        })

        if (
            response.data.status === "successful" &&
            response.data.amount
        ) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                paid: true
            })

            return res.json({
                success: true,
                message: "Payment verified successfully"
            })
        }

        res.json({ success: false, message: "Payment not successful" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export { registerUser, loginUser, getProfile, updateUserProfile, bookAppointment, getUserAppointment, cancelAppointment, paymentAppointment, verifyPayment }