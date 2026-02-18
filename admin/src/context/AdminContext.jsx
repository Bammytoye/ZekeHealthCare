import axios from 'axios';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashboard, setDashboard] = useState(false)


    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/admin/all-doctors', {}, { headers: { aToken } });

            if (data.success) {
                setDoctors(data.doctors)
                // console.log(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error fetching doctors:', error.message);
        }
    }

    const changeAvailability = async (doctorId) => {
        try {
            const { data } = await axios.post(backendUrl + '/admin/change-availability', { doctorId }, { headers: { aToken } });

            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/admin/get-appointments', { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                setAppointments(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointments = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/admin/cancel-appointments",
                { appointmentId },
                { headers: { aToken } }
            );

            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    const getDashboard = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/admin/admin-dashboard", { headers: { aToken } });

            if (data.success) {
                setDashboard(data.dashboardData)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        aToken, setAToken, backendUrl, setDashboard, getDashboard, dashboard, doctors, cancelAppointments, getAllDoctors, changeAvailability, getAllAppointments, setAppointments, appointments
    }; // You can add any global state or functions here


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;