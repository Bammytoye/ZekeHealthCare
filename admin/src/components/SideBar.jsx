import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

const SideBar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    const linkClass = ({ isActive }) =>
        `group flex items-center gap-3 py-3 px-3 md:px-6 md:min-w-64 rounded-2xl mx-2 cursor-pointer transition-all duration-300
        ${isActive
            ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-200'
            : 'text-gray-500 hover:bg-blue-50 hover:text-blue-500'}`

    const iconClass = (isActive) =>
        `w-5 h-5 transition-all duration-300 ${isActive ? 'brightness-0 invert' : 'opacity-60 group-hover:opacity-100'}`

    const adminLinks = [
        { to: '/admin_dashboard', icon: assets.home_icon, label: 'Dashboard' },
        { to: '/all_appointments', icon: assets.appointment_icon, label: 'Appointments' },
        { to: '/add_doctor', icon: assets.add_icon, label: 'Add Doctor' },
        { to: '/doctor_list', icon: assets.people_icon, label: 'Doctors List' },
    ]

    const doctorLinks = [
        { to: '/doctor_dashboard', icon: assets.home_icon, label: 'Dashboard' },
        { to: '/doctor_appointments', icon: assets.appointment_icon, label: 'Appointments' },
        { to: '/doctor_profile', icon: assets.people_icon, label: 'My Profile' },
    ]

    const renderLinks = (links) => (
        <ul className='flex flex-col gap-1.5 mt-4 px-0'>
            {links.map(({ to, icon, label }) => (
                <NavLink key={to} to={to} className={linkClass}>
                    {({ isActive }) => (
                        <>
                            <img src={icon} alt={label} className={iconClass(isActive)} />
                            <p className='hidden md:block text-sm font-semibold'>{label}</p>
                        </>
                    )}
                </NavLink>
            ))}
        </ul>
    )

    return (
        <div className='min-h-screen bg-white border-r border-gray-100 shadow-sm py-6'>

            {/* Role Badge */}
            {(aToken || dToken) && (
                <div className='hidden md:flex items-center gap-2 px-6 mb-5'>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${aToken ? 'bg-blue-500' : 'bg-cyan-500'}`}></div>
                    <p className='text-xs font-bold uppercase tracking-widest text-gray-400'>
                        {aToken ? 'Admin Panel' : 'Doctor Panel'}
                    </p>
                </div>
            )}

            {/* Divider */}
            <div className='hidden md:block mx-6 mb-4 h-px bg-gradient-to-r from-blue-100 via-cyan-100 to-transparent'></div>

            {aToken && renderLinks(adminLinks)}
            {dToken && renderLinks(doctorLinks)}
        </div>
    )
}

export default SideBar