import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets_admin/assets'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const NavBar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)
    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        dToken && setDToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && localStorage.removeItem('dToken')
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 bg-white border-b border-gray-100 shadow-sm'>

            {/* Left: Logo + Role Badge */}
            <div className='flex items-center gap-3'>
                <img
                    className='w-32 sm:w-40 cursor-pointer'
                    src={assets.admin_logo}
                    alt="Logo"
                />
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${aToken
                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                        : 'bg-cyan-50 text-cyan-600 border-cyan-200'
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${aToken ? 'bg-blue-500' : 'bg-cyan-500'}`}></span>
                    {aToken ? 'Admin' : 'Doctor'}
                </div>
            </div>

            {/* Right: Logout */}
            <button
                onClick={logout}
                className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md shadow-blue-100 hover:scale-105 hover:shadow-lg transition-all duration-300 group'
            >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                </svg>
                <span className='hidden sm:inline'>Logout</span>
            </button>
        </div>
    )
}

export default NavBar