import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContent } from '../context/AppContent'

const Doctors = () => {
    const { speciality } = useParams()
    const [filterDoctor, setFilterDoctor] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const navigate = useNavigate()

    const { doctorsData } = useContext(AppContent)

    const applyFilter = () => {
        if (speciality) {
            setFilterDoctor(doctorsData.filter(doc => doc.speciality === speciality))
        } else {
            setFilterDoctor(doctorsData)
        }
    }

    useEffect(() => {
        applyFilter()
    }, [doctorsData, speciality])

    const specialities = [
        { label: 'General Physician', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        { label: 'Gynecologist', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
        { label: 'Dermatologist', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
        { label: 'Pediatrician', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { label: 'Neurologist', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
        { label: 'Gastroenterologist', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    ]

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 sm:px-6 md:px-10 py-10'>

            {/* Header */}
            <div className='mb-8'>
                <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-blue-100'>Find a Specialist</span>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-800'>
                    Browse <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400'>Doctors</span>
                </h1>
                <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-3'></div>
                <p className='text-gray-400 text-sm mt-3'>Filter by speciality to find the right doctor for you.</p>
            </div>

            <div className='flex flex-col sm:flex-row items-start gap-6'>

                {/* Mobile filter toggle */}
                <button
                    className={`flex items-center gap-2 py-2 px-5 rounded-xl text-sm font-semibold border-2 transition-all duration-300 sm:hidden ${showFilter
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-transparent shadow-md'
                        : 'border-blue-200 text-blue-500 bg-white'}`}
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z' />
                    </svg>
                    {showFilter ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Sidebar Filters */}
                <div className={`flex flex-col gap-2 w-full sm:w-56 flex-shrink-0 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 hidden sm:block'>Specialities</p>
                    {specialities.map(({ label, icon }) => (
                        <button
                            key={label}
                            onClick={() => speciality === label ? navigate('/doctors') : navigate(`/doctors/${label}`)}
                            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${speciality === label
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-200'
                                : 'bg-white text-gray-600 border border-gray-100 hover:border-blue-200 hover:text-blue-500 hover:shadow-sm'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${speciality === label ? 'bg-white bg-opacity-20' : 'bg-blue-50'}`}>
                                <svg className={`w-4 h-4 ${speciality === label ? 'text-white' : 'text-blue-400'}`} fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d={icon} />
                                </svg>
                            </div>
                            {label}
                        </button>
                    ))}
                </div>

                {/* Doctors Grid */}
                <div className='flex-1 w-full'>

                    {/* Results count */}
                    {filterDoctor.length > 0 && (
                        <p className='text-sm text-gray-400 mb-4'>
                            Showing <span className='font-semibold text-gray-600'>{filterDoctor.length}</span> doctor{filterDoctor.length !== 1 ? 's' : ''}
                            {speciality && <> in <span className='text-blue-500 font-semibold'>{speciality}</span></>}
                        </p>
                    )}

                    {/* Empty State */}
                    {filterDoctor.length === 0 && (
                        <div className='flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm text-center px-6'>
                            <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-5'>
                                <svg className='w-10 h-10 text-blue-400' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                </svg>
                            </div>
                            <p className='text-xl font-bold text-gray-800 mb-2'>No doctors found</p>
                            <p className='text-gray-400 text-sm max-w-xs'>No doctors available for this speciality. Try selecting a different one.</p>
                        </div>
                    )}

                    {/* Doctor Cards */}
                    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {filterDoctor.map((item, index) => (
                            <div
                                onClick={() => navigate(`/appointment/${item._id}`)}
                                key={index}
                                className='group bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-100 hover:border-blue-200 transition-all duration-400'
                            >
                                {/* Image */}
                                <div className='relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50'>
                                    <img
                                        className='w-full object-cover group-hover:scale-105 transition-transform duration-500'
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    {/* Availability badge */}
                                    <div className={`absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${item.available ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-500 border border-red-200'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {item.available ? 'Available' : 'Unavailable'}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className='p-3'>
                                    <p className='text-gray-800 font-bold text-sm leading-tight'>{item.name}</p>
                                    <span className='inline-block mt-1 text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100'>
                                        {item.speciality}
                                    </span>

                                    {/* Book arrow */}
                                    <div className='flex items-center justify-between mt-3 pt-3 border-t border-gray-50'>
                                        <p className='text-xs text-gray-400'>Book now</p>
                                        <div className='w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300'>
                                            <svg className='w-3 h-3 text-blue-400 group-hover:text-white transition-colors duration-300' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Doctors