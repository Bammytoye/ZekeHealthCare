import React, { useEffect, useState } from 'react'
import assets from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const useCountUp = (target, duration = 1800) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        let start = 0
        const step = target / (duration / 16)
        const timer = setInterval(() => {
            start += step
            if (start >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)
        return () => clearInterval(timer)
    }, [target, duration])
    return count
}

const Banner = () => {
    const navigate = useNavigate()
    const doctorCount = useCountUp(100)
    const patientCount = useCountUp(50000, 2200)

    return (
        <div className='relative flex overflow-hidden bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 rounded-2xl px-6 sm:px-10 md:px-14 lg:px-16 my-20 md:mx-10 shadow-2xl shadow-blue-200'>

            {/* Decorative background circles */}
            <div className='absolute -top-10 -left-10 w-48 h-48 bg-white opacity-5 rounded-full'></div>
            <div className='absolute top-4 left-24 w-20 h-20 bg-white opacity-5 rounded-full'></div>
            <div className='absolute -bottom-12 left-1/3 w-64 h-64 bg-cyan-300 opacity-10 rounded-full'></div>
            <div className='absolute top-0 right-1/3 w-32 h-32 bg-blue-300 opacity-10 rounded-full'></div>

            {/* Left Content */}
            <div className='flex-1 py-10 sm:py-14 md:py-16 lg:py-24 lg:pl-5 z-10'>

                {/* Badge */}
                <div className='inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-5 border border-white border-opacity-30'>
                    <span className='w-2 h-2 bg-green-300 rounded-full animate-pulse'></span>
                    {doctorCount}+ Verified Doctors Available
                </div>

                {/* Heading */}
                <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
                    <p className='drop-shadow-md'>Book Appointment</p>
                    <p className='mt-2 text-blue-100'>With {doctorCount}+ Trusted</p>
                    <p className='text-white'>Doctors</p>
                </div>

                {/* Subtext */}
                <p className='mt-4 text-blue-100 text-sm sm:text-base max-w-xs hidden sm:block'>
                    Fast, simple, and secure booking with top-rated healthcare professionals near you.
                </p>

                {/* CTA Button */}
                <button
                    onClick={() => { navigate('/login'); scrollTo(0, 0) }}
                    className='mt-6 sm:mt-8 bg-white text-sm sm:text-base text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 group'>
                    Create Account
                    <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                    </svg>
                </button>

                {/* Trust indicators */}
                <div className='mt-6 flex items-center gap-4 hidden sm:flex'>
                    <div className='flex -space-x-2'>
                        {['bg-pink-300', 'bg-yellow-300', 'bg-green-300', 'bg-purple-300'].map((color, i) => (
                            <div key={i} className={`w-7 h-7 rounded-full ${color} border-2 border-white`}></div>
                        ))}
                    </div>
                    <p className='text-white text-xs sm:text-sm opacity-90'>
                        Join <span className='font-bold'>{patientCount.toLocaleString()}+</span> patients who booked this week
                    </p>
                </div>
            </div>

            {/* Right Image */}
            <div className='hidden md:flex md:w-1/2 lg:w-[370px] relative items-end justify-end'>
                <div className='absolute bottom-0 right-8 w-64 h-64 bg-blue-300 opacity-30 rounded-full blur-3xl'></div>
                <img
                    className='w-full absolute bottom-0 right-0 max-w-md drop-shadow-2xl'
                    src={assets.appointment_img}
                    alt="Doctor appointment"
                />
            </div>
        </div>
    )
}

export default Banner