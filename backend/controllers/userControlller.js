import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'


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



export { registerUser, loginUser, getProfile, updateUserProfile }