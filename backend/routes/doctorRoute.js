import express from 'express'
import { appointmentDoctor, doctorList, doctorLogin } from '../controllers/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', doctorLogin)
doctorRouter.get('/appointments', authDoctor , appointmentDoctor)

export default doctorRouter