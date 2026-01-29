import express from 'express' 
import cors from 'cors'
import 'dotenv/config.js'


//app config
const app = express();
const port = process.env.PORT || 8000;


//middlewares
app.use(cors());
app.use(express.json());

//api endpoints
app.get('/', (req, res) => {
    res.status(200).send('Booking Appointment Backend is running');
});

//listen 
app.listen(port, () => {
    console.log('Booking Appointment Backend is running on port', port);
});