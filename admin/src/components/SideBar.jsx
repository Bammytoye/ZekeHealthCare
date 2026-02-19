import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

const SideBar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 py-3.5 px-3 md:px-8 md:min-w-72 cursor-pointer
        ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary' : 'text-[#515151]'}`

    return (
        <div className="min-h-screen bg-white border-r">
            {aToken && (
                <ul className="mt-5">
                    <NavLink to="/admin_dashboard" className={linkClass}>
                        <img src={assets.home_icon} alt="Dashboard" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink to="/all_appointments" className={linkClass}>
                        <img src={assets.appointment_icon} alt="Appointments" />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>

                    <NavLink to="/add_doctor" className={linkClass}>
                        <img src={assets.add_icon} alt="Add Doctor" />
                        <p className='hidden md:block'>Add Doctor</p>
                    </NavLink>

                    <NavLink to="/doctor_list" className={linkClass}>
                        <img src={assets.people_icon} alt="Doctors List" />
                        <p className='hidden md:block'>Doctors List</p>
                    </NavLink>
                </ul>
            )}

            {dToken && (
                <ul className="mt-5">
                    <NavLink to="/doctor_dashboard" className={linkClass}>
                        <img src={assets.home_icon} alt="Dashboard" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink to="/doctor_appointments" className={linkClass}>
                        <img src={assets.appointment_icon} alt="Appointments" />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>

                    <NavLink to="/doctor_profile" className={linkClass}>
                        <img src={assets.people_icon} alt="Doctors List" />
                        <p className='hidden md:block'>Doctors Profile</p>
                    </NavLink>
                </ul>
            )}
        </div>
    )
}

export default SideBar
