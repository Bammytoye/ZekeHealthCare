import axios from 'axios';
import { useState } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/doctors/appointments`, { headers: { dtoken: dToken } });
            if (data.success) setAppointments([...data.appointments])
            else toast.error(data.message)
        } catch (error) {
            console.error('Error fetching appointments:', error.message);
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/doctors/cancel-appointments`, { appointmentId }, { headers: { dtoken: dToken } });
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else toast.error(data.message)
        } catch (error) {
            console.error(error.message);
            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/doctors/complete-appointments`, { appointmentId }, { headers: { dtoken: dToken } });
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else toast.error(data.message)
        } catch (error) {
            console.error(error.message);
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/doctors/dashboard`, { headers: { dtoken: dToken } });
            if (data.success) setDashData(data.dashData)
            else toast.error(data.message)
        } catch (error) {
            console.error(error.message);
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/doctors/profile`, { headers: { dtoken: dToken } });
            if (data.success) setProfileData(data.profileData)
            else toast.error(data.message)
        } catch (error) {
            console.error(error.message);
            toast.error(error.message)
        }
    }

    // ✅ NEW: updateProfile function
    const updateProfile = async (updatedData) => {
        try {
            const { data } = await axios.post(`${backendUrl}/doctors/update-profile`, updatedData, { headers: { dtoken: dToken } });
            if (data.success) {
                setProfileData(data.profileData) // update local state
                toast.success('Profile updated successfully')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error.message)
            toast.error(error.message)
        }
    }

    const value = {
        dToken,
        setDToken,
        backendUrl,
        getDashData,
        dashData,
        setDashData,
        getAppointments,
        appointments,
        setAppointments,
        completeAppointment,
        cancelAppointment,
        getProfileData,
        profileData,
        setProfileData,
        updateProfile // include updateProfile
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;