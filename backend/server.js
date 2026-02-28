import 'dotenv/config';

import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import express from 'express';
import cors from 'cors';
import connectDB from './config/MongoDB.js';
import configureCloudinary from './config/couldinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';


const app = express();
const port = process.env.PORT || 8000;
connectDB();
configureCloudinary();

// middlewares
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? [
            process.env.ADMIN_URL,
            process.env.FRONTEND_URL
        ]
        : ["http://localhost:5175", "http://localhost:5176"],
    credentials: true
}));
app.use(express.json());

//api endpoint
app.use('/api/admin/', adminRouter) //localhost:8000/api/admin/add-doctor
app.use('/api/doctors/', doctorRouter) //localhost:8000/api/doctors/list
app.use('/api/user/', userRouter) //localhost:8000/api/user/

// test route
app.get('/', (req, res) => {
    res.status(200).send('Booking Appointment Backend Running');
});

// listen
app.listen(port, () => {
    console.log(`Booking Appointment Backend running on port ${port}`);
});
