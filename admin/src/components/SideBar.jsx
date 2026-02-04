import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'

const SideBar = () => {
    const { aToken } = useContext(AdminContext)

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 py-3.5 px-3 md:px-8 md:min-w-72 cursor-pointer
        ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary' : 'text-[#515151]'}`

    return (
        <div className="min-h-screen bg-white border-r">
            {aToken && (
                <ul className="mt-5">
                    <NavLink to="/admin_dashboard" className={linkClass}>
                        <img src={assets.home_icon} alt="Dashboard" />
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink to="/all_appointments" className={linkClass}>
                        <img src={assets.appointment_icon} alt="Appointments" />
                        <p>Appointments</p>
                    </NavLink>

                    <NavLink to="/add_doctor" className={linkClass}>
                        <img src={assets.add_icon} alt="Add Doctor" />
                        <p>Add Doctor</p>
                    </NavLink>

                    <NavLink to="/doctor_list" className={linkClass}>
                        <img src={assets.people_icon} alt="Doctors List" />
                        <p>Doctors List</p>
                    </NavLink>
                </ul>
            )}
        </div>
    )
}

export default SideBar
