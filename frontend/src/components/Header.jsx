import React, { useEffect, useRef, useState } from 'react'
import assets from '../assets/assets_frontend/assets'

const useCountUp = (target, duration = 1800) => {
    const [count, setCount] = useState(0)
    const started = useRef(false)

    useEffect(() => {
        if (started.current) return
        started.current = true
        let startTime = null
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
            else setCount(target)
        }
        requestAnimationFrame(step)
    }, [target, duration])

    return count
}

const StatItem = ({ target, suffix, label }) => {
    const count = useCountUp(target)
    return (
        <div className='flex flex-col'>
            <span className='text-white text-lg sm:text-xl font-bold'>
                {count}{suffix}
            </span>
            <span className='text-white/60 text-xs'>{label}</span>
        </div>
    )
}

const Header = () => {
    return (
        <div className='relative flex flex-col md:flex-row flex-wrap mt-3 bg-primary rounded-2xl px-6 md:px-10 lg:px-20 overflow-hidden'>
            {/* Left: Text Content */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-5 py-4 md:py-[5vw] md:mb-[-30px] relative z-10'>

                {/* Badge */}
                <span className='flex items-center gap-2 bg-white/15 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20'>
                    <span className='w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse' />
                    Trusted Doctors Available
                </span>

                {/* Heading */}
                <p className='text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight lg:leading-tight'>
                    Book Appointment <br className='hidden sm:block' />
                    with <span className='text-white/70'>Trusted</span> Doctors
                </p>

                {/* Sub text with group profiles */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 text-white/80 text-sm font-light'>
                    <img className='w-20 sm:w-24 flex-shrink-0' src={assets.group_profiles} alt="Group Profiles" />
                    <p className='leading-relaxed'>
                        Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' />
                        schedule your appointment hassle-free.
                    </p>
                </div>

                {/* Animated Stats Row */}
                <div className='flex items-center gap-5 sm:gap-8'>
                    <StatItem target={200} suffix='+'  label='Doctors' />
                    <div className='w-px h-8 bg-white/20' />
                    <StatItem target={50}  suffix='+'  label='Specialities' />
                    <div className='w-px h-8 bg-white/20' />
                    <StatItem target={10000} suffix='+' label='Patients' duration={2200} />
                </div>

                {/* CTA Button */}
                <a
                    href='#speciality'
                    className='flex items-center gap-2.5 bg-white text-primary font-semibold text-sm
                        px-7 py-3.5 rounded-full mx-auto md:mx-0
                        shadow-lg shadow-black/20
                        hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5 hover:bg-gray-50
                        transition-all duration-300'
                >
                    Book Appointment
                    <span className='w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center'>
                        <img src={assets.arrow_icon} className='w-2.5' alt='' />
                    </span>
                </a>
            </div>

            {/* Right: Doctor Image */}
            <div className='md:w-1/2 relative flex items-end justify-center md:justify-end mt-6 md:mt-0'>
                <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-white/10 rounded-full blur-3xl pointer-events-none' />
                <img
                    className='w-4/5 sm:w-3/4 md:w-full md:absolute bottom-0 h-auto rounded-lg relative z-10'
                    src={assets.header_img}
                    alt="Header Doctor"
                />
            </div>
        </div>
    )
}

export default Header