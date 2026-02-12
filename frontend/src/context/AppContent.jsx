import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";


export const AppContent = createContext()

const AppContentProvider = (props) => {
    const currencySymbol = '₦'
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [doctorsData, setDoctorsData] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData, setUserData] = useState(false)

    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendURL + '/doctors/list')
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

    const loadUserProfile = async () => {
        try {
            const {data} = await axios.get(backendURL + '/user/get-profile', {headers: {token}})
                if (data.success) {
                    setUserData(data.userData) 
                } else {
                    toast.error(data.message)
                }
        } catch (error) {
            toast.error('Error fetching doctors data')
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            loadUserProfile()
        } else {
            setUserData(false)
        }
    }, [token])

    
    useEffect(() => {
        getDoctorsData()
    }, [])

    const value = {
        currencySymbol,
        doctorsData, token, setToken, backendURL, userData, setUserData, loadUserProfile
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}

export default AppContentProvider