import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentDoctor, doctorDashboard, doctorList, doctorLogin, doctorProfile, updateProfile } from '../controllers/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', doctorLogin)
doctorRouter.get('/appointments', authDoctor , appointmentDoctor)
doctorRouter.post('/complete-appointments', authDoctor , appointmentComplete)
doctorRouter.post('/cancel-appointments', authDoctor , appointmentCancel)
doctorRouter.get('/dashboard', authDoctor , doctorDashboard)
doctorRouter.post('/update-profile', authDoctor,  updateProfile)
doctorRouter.get('/profile', authDoctor, doctorProfile)

export default doctorRouter