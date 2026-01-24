import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";

export const AppContent = createContext()

const AppContentProvider = (props) => {
    const value = {
        doctors
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}

export default AppContentProvider