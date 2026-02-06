import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";


export const AppContent = createContext()

const AppContentProvider = (props) => {
    const currencySymbol = '₦'
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [doctorsData, setDoctorsData] = useState([])

    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendURL + 'doctors/list')
            if (data.success) { 
                setDoctorsData(data.doctorsData)
            } else {
                toast.error('Error fetching doctors data')
            }
        } catch (error) {
            toast.error('Error fetching doctors data')
            console.log(error.message)
        }
    }
    
    useEffect(() => {
        getDoctorsData()
    }, [])

    const value = {
        currencySymbol,
        doctorsData
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}

export default AppContentProvider