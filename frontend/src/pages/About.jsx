import React, { useEffect, useState } from 'react'
import assets from '../assets/assets_frontend/assets'

const useCountUp = (target, duration = 2000) => {
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

const About = () => {
    const patientCount = useCountUp(50000, 2200)
    const doctorCount = useCountUp(100, 1800)
    const rating = useCountUp(49, 2000)
    const features = [
        {
            icon: 'M13 10V3L4 14h7v7l9-11h-7z',
            title: 'Efficiency',
            desc: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
            color: 'from-blue-500 to-cyan-400',
        },
        {
            icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
            title: 'Convenience',
            desc: 'Access to a network of trusted healthcare professionals in your area.',
            color: 'from-blue-600 to-blue-400',
        },
        {
            icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
            title: 'Personalization',
            desc: 'Tailored recommendations and reminders to help you stay on top of your health.',
            color: 'from-cyan-500 to-blue-400',
        },
    ]

    return (
        <div className='px-4 sm:px-6 md:px-10'>

            {/* Hero Header */}
            <div className='text-center pt-12 pb-4'>
                <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4'>Who We Are</span>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800'>
                    About <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400'>Us</span>
                </h1>
                <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4'></div>
            </div>

            {/* About Section */}
            <div className='my-14 flex flex-col md:flex-row gap-10 lg:gap-16 items-center'>

                {/* Image */}
                <div className='relative w-full md:max-w-[380px] flex-shrink-0'>
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-2xl translate-x-3 translate-y-3 opacity-30'></div>
                    <img
                        className='relative w-full rounded-2xl shadow-xl object-cover'
                        src={assets.about_image}
                        alt="About ZekeTech"
                    />
                    <div className='absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-500 to-cyan-400 text-white px-5 py-3 rounded-xl shadow-lg text-center'>
                        <p className='text-2xl font-bold'>{doctorCount}+</p>
                        <p className='text-xs opacity-90'>Trusted Doctors</p>
                    </div>
                </div>

                {/* Text */}
                <div className='flex flex-col justify-center gap-5 text-sm text-gray-600 leading-7'>
                    <p className='text-justify'>
                        Welcome to <span className='text-blue-500 font-semibold'>ZekeTech</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
                    </p>
                    <p className='text-justify'>
                        ZekeTech is committed to excellence in healthcare technology. We continuously strive 
                        to enhance our platform, integrating the latest advancements to improve 
                        user experience and deliver superior service-whether you're booking your first 
                        appointment or managing ongoing care.
                    </p>

                    <div className='bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-5 mt-2'>
                        <div className='flex items-center gap-2 mb-2'>
                            <div className='w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center'>
                                <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                </svg>
                            </div>
                            <p className='text-gray-800 font-bold text-base'>Our Vision</p>
                        </div>
                        <p className='text-justify text-gray-600'>
                            To create a seamless healthcare experience for every user-bridging the gap between 
                            patients and providers, making care accessible when and where you need it.
                        </p>
                    </div>

                    <div className='grid grid-cols-3 gap-4 mt-2'>
                        {[
                            { val: `${patientCount.toLocaleString()}+`, label: 'Patients' },
                            { val: `${doctorCount}+`, label: 'Doctors' },
                            { val: `${(rating / 10).toFixed(1)}★`, label: 'Rating' },
                        ].map(({ val, label }) => (
                            <div key={label} className='text-center p-3 bg-white rounded-xl shadow-sm border border-gray-100'>
                                <p className='text-blue-500 font-bold text-lg'>{val}</p>
                                <p className='text-gray-500 text-xs mt-0.5'>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className='mt-20 mb-16'>
                <div className='text-center mb-10'>
                    <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4'>Our Promise</span>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800'>
                        Why <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400'>Choose Us</span>
                    </h2>
                    <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4'></div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {features.map(({ icon, title, desc, color }) => (
                        <div key={title}
                            className='group relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-400 cursor-pointer overflow-hidden'>

                            {/* Hover gradient fill */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl`}></div>

                            {/* Content */}
                            <div className='relative z-10'>
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 group-hover:bg-white group-hover:bg-opacity-20 transition-all duration-300 shadow-md`}>
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d={icon} />
                                    </svg>
                                </div>
                                <h3 className='text-gray-800 font-bold text-base uppercase tracking-wide mb-3 group-hover:text-white transition-colors duration-300'>{title}</h3>
                                <p className='text-gray-500 text-sm leading-6 group-hover:text-blue-50 transition-colors duration-300'>{desc}</p>
                            </div>

                            {/* Corner accent */}
                            <div className='absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-white opacity-5 group-hover:opacity-10 transition-opacity duration-300'></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About