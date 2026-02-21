import React from 'react'
import assets from '../assets/assets_frontend/assets'

const slideInStyle = `
@keyframes slideInLeft {
    0% {
        opacity: 0;
        transform: translateX(-80px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
.slide-in {
    opacity: 0;
    animation: slideInLeft 0.6s ease-out forwards;
}
.slide-in-1 { animation-delay: 0.1s; }
.slide-in-2 { animation-delay: 0.35s; }
.slide-in-3 { animation-delay: 0.6s; }
`

const Contact = () => {
    const contactDetails = [
        {
            icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
            label: 'Our Office',
            value: '123 Main Street, Nigeria',
        },
        {
            icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
            label: 'Phone',
            value: '+2348169885711',
        },
        {
            icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
            label: 'Email',
            value: 'bamigbalatoyese@gmail.com',
        },
    ]

    return (
        <div className='px-4 sm:px-6 md:px-10'>
            <style>{slideInStyle}</style>

            {/* Header */}
            <div className='text-center pt-12 pb-4'>
                <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4'>We'd Love to Hear From You</span>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800'>
                    Contact <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400'>Us</span>
                </h1>
                <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4'></div>
            </div>

            {/* Main Content */}
            <div className='my-14 flex flex-col md:flex-row gap-10 lg:gap-16 items-center mb-28'>

                {/* Image */}
                <div className='relative w-full md:max-w-[380px] flex-shrink-0'>
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-2xl translate-x-3 translate-y-3 opacity-30'></div>
                    <img
                        className='relative w-full rounded-2xl shadow-xl object-cover'
                        src={assets.contact_image}
                        alt="Contact ZekeTech"
                    />
                    {/* Floating availability badge */}
                    <div className='absolute -bottom-4 -left-4 bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3'>
                        <span className='w-3 h-3 bg-green-400 rounded-full animate-pulse flex-shrink-0'></span>
                        <div>
                            <p className='text-gray-800 font-semibold text-xs'>Available Now</p>
                            <p className='text-gray-400 text-xs'>Mon – Fri, 9am – 6pm</p>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className='flex flex-col gap-6 w-full'>

                    {/* Contact Cards */}
                    <div className='flex flex-col gap-4'>
                        {contactDetails.map(({ icon, label, value }, index) => (
                            <div key={label} className={`slide-in slide-in-${index + 1} flex items-start gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}>
                                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-md'>
                                    <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d={icon} />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5'>{label}</p>
                                    <p className='text-gray-700 font-medium text-sm break-all'>{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Careers CTA */}
                    <div className='bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 rounded-2xl p-6 text-white relative overflow-hidden'>
                        {/* Decorative blobs */}
                        <div className='absolute -top-6 -right-6 w-24 h-24 bg-white opacity-5 rounded-full'></div>
                        <div className='absolute bottom-0 right-12 w-16 h-16 bg-cyan-300 opacity-10 rounded-full'></div>

                        <div className='relative z-10'>
                            <p className='text-xs font-semibold tracking-widest uppercase text-blue-100 mb-1'>We're Hiring</p>
                            <p className='text-lg sm:text-xl font-bold mb-2'>Join the ZekeTech Team</p>
                            <p className='text-blue-100 text-sm leading-6 mb-5'>
                                Learn more about our teams and open roles. We're building the future of healthcare — come build it with us.
                            </p>
                            <button className='bg-white text-blue-600 font-semibold text-sm px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center gap-2 group'>
                                Explore Jobs
                                <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact