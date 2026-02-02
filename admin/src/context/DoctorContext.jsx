import { createContext } from 'react';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const value = {}; // You can add any global state or functions here


    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;