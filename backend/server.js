import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/MongoDB.js';
import configureCloudinary from './config/couldinary.js';
import adminRouter from './routes/adminRoute.js';


const app = express();
const port = process.env.PORT || 8000;
connectDB();
configureCloudinary();

// middlewares
app.use(cors());
app.use(express.json());

//api endpoint
app.use('/api/admin/', adminRouter) //localhost:8000/api/admin/add-doctor

// test route
app.get('/', (req, res) => {
    res.status(200).send('Booking Appointment Backend Running');
});

// listen
app.listen(port, () => {
    console.log(`Booking Appointment Backend running on port ${port}`);
});
