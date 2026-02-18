import { createContext } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currency = '₦'
    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const slotDateFormat = (slotDate) => {
        if (!slotDate) return ''
        try {
            const [day, month, year] = slotDate.split('/')
            return `${day} ${months[Number(month) - 1]} ${year}`
        } catch (error) {
            return slotDate
        }
    }

    const value = { calculateAge, slotDateFormat, currency }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;