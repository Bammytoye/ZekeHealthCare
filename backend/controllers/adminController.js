import validator from 'validator';
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'


//api for adding doctors
const addDoctor = async(req, res) => {
    try {
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body
        const imageFile = req.file

        console.log({password, speciality, degree, experience, about, fees, address}, imageFile)
        //check all data to add doctor into database
        if(!name || !email || !password || !speciality || !degree || !experience || !about || ! fees || !address){
            return res.json({success: false, message: 'Missing Details, Try Again'})
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success: false, message: 'Please enter valid email!'})
        }

        //validating for password
        if (password.length < 8) {
            return res.json({success: false, message: 'Enter a strong password'})
        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload file or image into cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success: true, message: 'New Doctor Added'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


//API FOR ADMIN LOGIN
const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({sucess:true, token})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


export {addDoctor, loginAdmin}