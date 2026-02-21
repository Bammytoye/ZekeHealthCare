import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorList = () => {
    const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken]);

    if (!aToken) return (
        <div className='flex flex-col items-center justify-center min-h-[60vh]'>
            <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-4'>
                <svg className='w-8 h-8 text-blue-400' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                </svg>
            </div>
            <p className='text-gray-500 font-medium'>Please login to view doctors.</p>
        </div>
    )

    return (
        <div className='m-5'>

            {/* Page Header */}
            <div className='mb-8'>
                <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-blue-100'>
                    Management
                </span>
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                    All <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400'>Doctors</span>
                </h1>
                <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-3'></div>
                {doctors.length > 0 && (
                    <p className='text-sm text-gray-400 mt-2'>
                        Showing <span className='font-semibold text-gray-600'>{doctors.length}</span> registered doctor{doctors.length !== 1 ? 's' : ''}
                    </p>
                )}
            </div>

            {/* Empty State */}
            {doctors.length === 0 && (
                <div className='flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm text-center px-6'>
                    <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-5'>
                        <svg className='w-10 h-10 text-blue-400' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                        </svg>
                    </div>
                    <p className='text-xl font-bold text-gray-800 mb-2'>No doctors found</p>
                    <p className='text-gray-400 text-sm max-w-xs'>Add doctors to the platform and they'll appear here.</p>
                </div>
            )}

            {/* Doctor Cards Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {doctors.map((doctor, index) => (
                    <div
                        key={index}
                        className='group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-100 hover:border-blue-200 hover:-translate-y-1.5 transition-all duration-400 cursor-pointer'
                    >
                        {/* Image */}
                        <div className='relative h-44 w-full bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden'>
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className='h-full w-full object-cover group-hover:scale-105 transition-transform duration-500'
                            />
                            {/* Availability badge */}
                            <div className={`absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${doctor.available
                                    ? 'bg-green-50 text-green-600 border border-green-200'
                                    : 'bg-red-50 text-red-500 border border-red-200'
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${doctor.available ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`}></span>
                                {doctor.available ? 'Available' : 'Unavailable'}
                            </div>
                        </div>

                        {/* Content */}
                        <div className='p-4'>
                            <p className='font-bold text-gray-800 text-sm leading-tight'>Dr. {doctor.name}</p>
                            <span className='inline-block mt-1 text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100'>
                                {doctor.speciality}
                            </span>

                            {/* Availability Toggle */}
                            <div className='flex items-center gap-2 mt-4 pt-3 border-t border-gray-50'>
                                <label className='flex items-center gap-2 cursor-pointer'>
                                    <div className='relative'>
                                        <input
                                            onChange={() => changeAvailability(doctor._id)}
                                            type='checkbox'
                                            checked={doctor.available}
                                            className='sr-only peer'
                                        />
                                        <div className='w-9 h-5 bg-gray-200 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-400 rounded-full transition-all duration-300'></div>
                                        <div className='absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 peer-checked:translate-x-4'></div>
                                    </div>
                                    <span className={`text-xs font-semibold ${doctor.available ? 'text-green-600' : 'text-gray-400'}`}>
                                        {doctor.available ? 'Active' : 'Inactive'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorList;