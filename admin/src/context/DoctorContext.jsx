import axios from 'axios';
import { useState } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/doctors/appointments', { headers: { dtoken: dToken } });

            if (data.success) {
                setAppointments([...data.appointments].reverse())
                // console.log(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error fetching doctors:', error.message);
        }
    }



    const value = { dToken, setDToken, backendUrl, getAppointments, appointments, setAppointments };


    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;