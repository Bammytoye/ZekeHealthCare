import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, paymentAppointment, getUserAppointment, loginUser, registerUser, updateUserProfile, verifyPayment } from '../controllers/userControlller.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/update-profile', upload.single('image'), authUser, updateUserProfile)


userRouter.get('/get-profile', authUser ,getProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/get-appointment', authUser, getUserAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
userRouter.post('/payment-appointment', authUser, paymentAppointment)
userRouter.post('/verify-payment', authUser, verifyPayment)


export default userRouter