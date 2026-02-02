import { createContext } from 'react';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const value = {}; // You can add any global state or functions here


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;