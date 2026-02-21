import React from 'react'
import assets from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about' },
        { label: 'Contact Us', path: '/contact' },
    ]
    return (
        <div className='md:mx-10'>
            <div className='relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 rounded-2xl px-8 sm:px-12 md:px-16 pt-16 pb-10 mt-40 overflow-hidden'>

                {/* Decorative background blobs */}
                <div className='absolute -top-10 -right-10 w-52 h-52 bg-white opacity-5 rounded-full'></div>
                <div className='absolute bottom-0 left-10 w-40 h-40 bg-cyan-300 opacity-10 rounded-full blur-2xl'></div>
                <div className='absolute top-8 left-1/2 w-24 h-24 bg-white opacity-5 rounded-full'></div>

                <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 text-sm z-10 relative'>

                    {/* Brand Column */}
                    <div>
                        <img className='mb-5 w-36 brightness-0 invert' src={assets.logo} alt="ZekeTech Logo" />
                        <p className='w-full md:w-3/4 text-blue-100 leading-7 text-sm'>
                            Connecting patients with trusted doctors for fast, simple, and secure appointment booking. Your health is our priority — always.
                        </p>

                        {/* Social Icons */}
                        <div className='flex gap-3 mt-6'>
                            {[
                                { label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                                { label: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                                { label: 'Instagram', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z' },
                            ].map(({ label, path }) => (
                                <button key={label} aria-label={label}
                                    className='w-9 h-9 rounded-full bg-white bg-opacity-15 border border-white border-opacity-20 flex items-center justify-center hover:bg-opacity-25 hover:scale-110 transition-all duration-300'>
                                    <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d={path} />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Company Column */}
                    <div>
                        <p className='text-white font-bold text-sm tracking-widest mb-6 uppercase'>Company</p>
                        <ul className='flex flex-col gap-3 text-blue-100'>
                            {navLinks.map(({ label, path }) => (
                                <li key={label}
                                    onClick={() => { navigate(path); scrollTo(0, 0) }}
                                    className='cursor-pointer hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group'>
                                    <span className='w-1 h-1 rounded-full bg-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <p className='text-white font-bold text-sm tracking-widest mb-6 uppercase'>Get In Touch</p>
                        <ul className='flex flex-col gap-4 text-blue-100'>
                            <li className='flex items-start gap-3'>
                                <div className='w-8 h-8 rounded-full bg-white bg-opacity-15 flex items-center justify-center flex-shrink-0 mt-0.5'>
                                    <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                                    </svg>
                                </div>
                                <span className='hover:text-white transition-colors duration-200 cursor-pointer'>+2348169885711</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <div className='w-8 h-8 rounded-full bg-white bg-opacity-15 flex items-center justify-center flex-shrink-0 mt-0.5'>
                                    <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                    </svg>
                                </div>
                                <span className='hover:text-white transition-colors duration-200 cursor-pointer break-all'>bamigbalatoyese@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider & Copyright */}
                <div className='mt-12 pt-6 border-t border-white border-opacity-20 flex flex-col sm:flex-row items-center justify-between gap-3 z-10 relative'>
                    <p className='text-blue-100 text-xs sm:text-sm text-center sm:text-left'>
                        © 2026 <span className='text-white font-semibold'>ZekeTech</span> — All Rights Reserved.
                    </p>
                    <div className='flex gap-4 text-blue-100 text-xs'>
                        {['Terms', 'Privacy', 'Cookies'].map(item => (
                            <span key={item} className='hover:text-white cursor-pointer transition-colors duration-200'>{item}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer