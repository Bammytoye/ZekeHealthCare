import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContent';

const TopDoctor = () => {
    const navigate = useNavigate()
    const { doctorsData } = useContext(AppContent)

    return (
        <div className='flex flex-col items-center gap-4 my-16 lg:my-24 px-4 sm:px-6 lg:px-10 text-gray-900'>

            {/* Header */}
            <div className='flex flex-col items-center gap-3 mb-2'>
                <span className='text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 px-4 py-1.5 rounded-full'>
                    Top Rated
                </span>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center leading-tight'>
                    Top Doctors to Book
                </h1>
                <p className='sm:w-1/3 md:w-2/3 lg:w-full text-center text-sm text-gray-500 leading-relaxed'>
                    Simply browse through our extensive list of trusted doctors
                </p>
                <div className='w-12 h-1 bg-primary rounded-full mt-1' />
            </div>

            {/* Doctors Grid */}
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 pt-5'>
                {doctorsData.slice(0, 8).map((item, index) => (
                    <div
                        onClick={() => {
                            navigate(`/appointment/${item._id}`)
                            window.scrollTo(0, 0)
                        }}
                        key={index}
                        className='group bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer
                            shadow-sm hover:shadow-xl hover:shadow-primary/10
                            hover:-translate-y-2 hover:border-primary/20
                            transition-all duration-300'
                    >
                        {/* Doctor Image */}
                        <div className='bg-gradient-to-br from-blue-50 to-primary/10 w-full aspect-square overflow-hidden'>
                            <img
                                className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500'
                                src={item.image}
                                alt={item.name}
                            />
                        </div>

                        {/* Doctor Info */}
                        <div className='p-3 sm:p-4'>
                            {/* Availability Badge */}
                            <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full mb-2
                                ${item.available
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-red-50 text-red-500'
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-400'}`} />
                                {item.available ? 'Available' : 'Not Available'}
                            </div>

                            <p className='text-gray-900 text-sm sm:text-base font-semibold leading-snug truncate'>
                                {item.name}
                            </p>
                            <p className='text-xs sm:text-sm text-gray-400 mt-0.5 truncate'>
                                {item.speciality}
                            </p>

                            {/* Book CTA */}
                            <div className='mt-3 pt-3 border-t border-gray-50'>
                                <span className='text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                                    Book Appointment →
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* More Button */}
            <button
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                className='mt-10 flex items-center gap-2 bg-white border-2 border-primary/20 text-primary font-semibold
                    px-10 py-3 rounded-full text-sm
                    hover:bg-primary hover:text-white hover:border-primary
                    hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5
                    transition-all duration-300'
            >
                View All Doctors
                <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
            </button>
        </div>
    );
};

export default TopDoctor;