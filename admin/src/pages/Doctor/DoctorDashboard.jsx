import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
    const { dToken, getDashData, dashData, setDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
    const { currency, slotDateFormat } = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getDashData()
        }
    }, [dToken])

    const statCards = dashData ? [
        {
            label: 'Total Earnings',
            value: `${currency}${dashData.earning}`,
            icon: assets.earning_icon,
            gradient: 'from-blue-500 to-cyan-400',
            bg: 'from-blue-50 to-cyan-50',
            border: 'border-blue-100',
            shadow: 'shadow-blue-100',
        },
        {
            label: 'Total Appointments',
            value: dashData.appointments,
            icon: assets.appointments_icon,
            gradient: 'from-green-400 to-emerald-500',
            bg: 'from-green-50 to-emerald-50',
            border: 'border-green-100',
            shadow: 'shadow-green-100',
        },
        {
            label: 'Total Patients',
            value: dashData.patients,
            icon: assets.patients_icon,
            gradient: 'from-purple-500 to-violet-400',
            bg: 'from-purple-50 to-violet-50',
            border: 'border-purple-100',
            shadow: 'shadow-purple-100',
        },
    ] : []

    return dashData && (
        <div className='m-5'>

            {/* Page Header */}
            <div className='mb-8'>
                <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-blue-100'>
                    Overview
                </span>
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                    Doctor <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400'>Dashboard</span>
                </h1>
                <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-3'></div>
            </div>

            {/* Stat Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10'>
                {statCards.map(({ label, value, icon, gradient, bg, border, shadow }) => (
                    <div
                        key={label}
                        className={`relative bg-gradient-to-br ${bg} border ${border} rounded-3xl p-6 shadow-sm hover:shadow-lg hover:${shadow} hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                    >
                        {/* Decorative circle */}
                        <div className='absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white opacity-40'></div>

                        <div className='flex items-center justify-between relative z-10'>
                            <div>
                                <p className='text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1'>{label}</p>
                                <h2 className='text-3xl font-bold text-gray-800'>{value}</h2>
                            </div>
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
                                <img src={icon} alt={label} className='w-7 brightness-0 invert' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Latest Bookings */}
            <div className='bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden'>

                {/* Section Header */}
                <div className='flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-100'>
                    <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow'>
                        <img src={assets.list_icon} alt='' className='w-4 brightness-0 invert' />
                    </div>
                    <p className='font-bold text-gray-700 text-sm uppercase tracking-widest'>Latest Bookings</p>
                </div>

                <div className='divide-y divide-gray-50'>
                    {dashData.latestAppointments?.length === 0 && (
                        <div className='flex flex-col items-center justify-center py-14 text-center px-6'>
                            <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-3'>
                                <svg className='w-7 h-7 text-blue-400' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                </svg>
                            </div>
                            <p className='font-bold text-gray-600 mb-1'>No recent bookings</p>
                            <p className='text-xs text-gray-400'>New patient bookings will appear here.</p>
                        </div>
                    )}

                    {dashData.latestAppointments?.map((item) => (
                        <div
                            key={item._id}
                            className='flex items-center justify-between px-6 py-4 hover:bg-blue-50/40 transition-all duration-200'
                        >
                            {/* Patient Info */}
                            <div className='flex items-center gap-4'>
                                <img
                                    src={item.userData?.image}
                                    alt=''
                                    className='w-11 h-11 rounded-xl object-cover border-2 border-blue-100 flex-shrink-0'
                                />
                                <div>
                                    <p className='font-semibold text-gray-800 text-sm'>{item.userData?.name}</p>
                                    <div className='flex items-center gap-1.5 mt-0.5'>
                                        <svg className='w-3 h-3 text-blue-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                        </svg>
                                        <p className='text-xs text-gray-400'>{slotDateFormat(item.slotDate)} · {item.slotTime}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Status / Actions */}
                            {item.cancelled ? (
                                <span className='inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-50 border border-red-200 rounded-full'>
                                    <svg className='w-3 h-3' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                                    </svg>
                                    Cancelled
                                </span>
                            ) : item.isCompleted ? (
                                <span className='inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 rounded-full'>
                                    <svg className='w-3 h-3' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                                    </svg>
                                    Completed
                                </span>
                            ) : (
                                <div className='flex items-center gap-2'>
                                    <button
                                        onClick={() => cancelAppointment(item._id)}
                                        className='w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 border border-red-100 hover:bg-red-500 hover:border-red-500 group transition-all duration-200'
                                    >
                                        <img src={assets.cancel_icon} alt='Cancel' className='w-4 group-hover:brightness-0 group-hover:invert transition-all duration-200' />
                                    </button>
                                    <button
                                        onClick={() => completeAppointment(item._id)}
                                        className='w-8 h-8 flex items-center justify-center rounded-xl bg-green-50 border border-green-100 hover:bg-green-500 hover:border-green-500 group transition-all duration-200'
                                    >
                                        <img src={assets.tick_icon} alt='Complete' className='w-4 group-hover:brightness-0 group-hover:invert transition-all duration-200' />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard