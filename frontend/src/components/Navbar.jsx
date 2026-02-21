import React, { useContext, useState, useEffect } from 'react'
import assets from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContent'

const Navbar = () => {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { token, setToken, userData } = useContext(AppContent)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <>
            {/* Main Navbar */}
            <div className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4'>

                    {/* Logo */}
                    <img
                        onClick={() => navigate('/')}
                        className='w-32 sm:w-36 cursor-pointer hover:opacity-80 transition-opacity duration-200 flex-shrink-0'
                        src={assets.logo}
                        alt="Logo"
                    />

                    {/* Desktop Nav Links */}
                    <ul className='hidden md:flex items-center gap-1'>
                        {[
                            { to: '/', label: 'Home' },
                            { to: '/doctors', label: 'All Doctors' },
                            { to: '/about', label: 'About' },
                            { to: '/contact', label: 'Contact' },
                        ].map(({ to, label }) => (
                            <NavLink key={to} to={to}>
                                {({ isActive }) => (
                                    <li className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide cursor-pointer transition-all duration-200 list-none
                                        ${isActive
                                            ? 'bg-primary/10 text-primary font-semibold'
                                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                                        }`}>
                                        {label}
                                    </li>
                                )}
                            </NavLink>
                        ))}
                    </ul>

                    {/* Right Section */}
                    <div className='flex items-center gap-3'>

                        {/* Logged In: Profile Dropdown */}
                        {token ? (
                            <div className='relative flex items-center gap-2 cursor-pointer group'>
                                <div className='flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200'>
                                    <img
                                        className='w-8 h-8 rounded-full object-cover ring-2 ring-primary/20'
                                        src={userData.image}
                                        alt="Profile"
                                    />
                                    <img
                                        className='w-2.5 opacity-50 group-hover:opacity-80 transition-transform duration-200 group-hover:rotate-180'
                                        src={assets.dropdown_icon}
                                        alt="Dropdown"
                                    />
                                </div>

                                {/* Dropdown Menu */}
                                <div className='absolute top-full right-0 mt-3 w-48 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50 overflow-hidden'>
                                    <div className='p-1.5'>
                                        <p
                                            onClick={() => navigate('/my-profile')}
                                            className='flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 font-medium rounded-xl hover:text-primary cursor-pointer transition-colors duration-150'
                                        >
                                            <span className='w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-xs'>👤</span>
                                            My Profile
                                        </p>
                                        <p
                                            onClick={() => navigate('/my-appointment')}
                                            className='flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 font-medium rounded-xl hover:text-primary cursor-pointer transition-colors duration-150'
                                        >
                                            <span className='w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-xs'>📅</span>
                                            My Appointments
                                        </p>
                                        <div className='h-px bg-gray-100 my-1' />
                                        <p
                                            onClick={logout}
                                            className='flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-500 font-medium rounded-xl hover:bg-red-50 cursor-pointer transition-colors duration-150'
                                        >
                                            <span className='w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center text-xs'>🚪</span>
                                            Log Out
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Not Logged In: CTA Button */
                            <button
                                onClick={() => navigate('/login')}
                                className='hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200'
                            >
                                Create Account
                            </button>
                        )}

                        {/* Hamburger Button (Mobile only) */}
                        <button
                            onClick={() => setShowMenu(true)}
                            className='md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer'
                        >
                            <img className='w-5' src={assets.menu_icon} alt="Menu" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile: Backdrop Overlay */}
            <div
                onClick={() => setShowMenu(false)}
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Mobile: Slide-in Drawer */}
            <div className={`fixed top-0 right-0 bottom-0 w-72 sm:w-80 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Drawer Header */}
                <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
                    <img className='w-28' src={assets.logo} alt="Logo" />
                    <button
                        onClick={() => setShowMenu(false)}
                        className='w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200'
                    >
                        <img className='w-3.5' src={assets.cross_icon} alt="Close" />
                    </button>
                </div>

                {/* Drawer Nav Links */}
                <div className='flex flex-col gap-1 p-4 flex-1 overflow-y-auto'>
                    {[
                        { to: '/', label: 'Home', icon: '🏠' },
                        { to: '/doctors', label: 'All Doctors', icon: '🩺' },
                        { to: '/about', label: 'About', icon: 'ℹ️' },
                        { to: '/contact', label: 'Contact', icon: '📬' },
                    ].map(({ to, label, icon }) => (
                        <NavLink key={to} to={to} onClick={() => setShowMenu(false)}>
                            {({ isActive }) => (
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer
                                    ${isActive
                                        ? 'bg-primary/10 text-primary font-semibold'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}>
                                    <span className='text-base'>{icon}</span>
                                    {label}
                                </div>
                            )}
                        </NavLink>
                    ))}

                    {/* Account Section when logged in */}
                    {token && (
                        <>
                            <div className='h-px bg-gray-100 my-3' />
                            <p className='text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-1'>Account</p>
                            <div
                                onClick={() => { navigate('/my-profile'); setShowMenu(false); }}
                                className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-colors duration-150'
                            >
                                <span className='text-base'>👤</span> My Profile
                            </div>
                            <div
                                onClick={() => { navigate('/my-appointment'); setShowMenu(false); }}
                                className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-colors duration-150'
                            >
                                <span className='text-base'>📅</span> My Appointments
                            </div>
                            <div
                                onClick={() => { logout(); setShowMenu(false); }}
                                className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 cursor-pointer transition-colors duration-150'
                            >
                                <span className='text-base'>🚪</span> Log Out
                            </div>
                        </>
                    )}
                </div>

                {/* Drawer Footer: Create Account (when not logged in) */}
                {!token && (
                    <div className='p-4 border-t border-gray-100'>
                        <button
                            onClick={() => { navigate('/login'); setShowMenu(false); }}
                            className='w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl text-sm shadow-md shadow-primary/30 hover:shadow-lg transition-all duration-200'
                        >
                            Create Account
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Navbar