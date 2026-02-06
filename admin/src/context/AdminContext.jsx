import axios from 'axios';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])


    const getAllDoctors = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/admin/all-doctors', {}, {headers: {aToken}});

            if (data.success){
                setDoctors(data.doctors)
                // console.log(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error fetching doctors:', error.message);
        }
    }


    const value = {
        aToken, setAToken, backendUrl, doctors, getAllDoctors, 
    }; // You can add any global state or functions here


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;