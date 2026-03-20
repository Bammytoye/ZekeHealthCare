import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
    const { aToken, getDashboard, dashboard, cancelAppointments } = useContext(AdminContext)
    const { slotDateFormat } = useContext(AppContext)
    const [loadingCancel, setLoadingCancel] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState(null)

    useEffect(() => {
        if (aToken) getDashboard()
    }, [aToken])

    if (!dashboard) return (
        <div className='flex flex-col items-center justify-center min-h-[60vh]'>
            <div className='relative w-14 h-14'>
                <div className='absolute inset-0 rounded-full border-4 border-blue-100'></div>
                <div className='absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin'></div>
            </div>
            <p className='mt-4 text-gray-400 font-medium'>Loading dashboard...</p>
        </div>
    )

    const handleCancelClick = (appointmentId) => {
        setSelectedAppointment(appointmentId)
        setModalVisible(true)
    }

    const confirmCancel = async () => {
        if (!selectedAppointment) return
        setLoadingCancel(true)
        try {
            await cancelAppointments(selectedAppointment)
            await getDashboard()
            setModalVisible(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingCancel(false)
            setSelectedAppointment(null)
        }
    }

    const statCards = [
        {
            label: 'Total Doctors',
            value: dashboard.doctors,
            icon: assets.doctor_icon,
            gradient: 'from-blue-500 to-cyan-400',
            bg: 'from-blue-50 to-cyan-50',
            border: 'border-blue-100',
            shadow: 'hover:shadow-blue-100',
        },
        {
            label: 'Total Appointments',
            value: dashboard.appointments,
            icon: assets.appointments_icon,
            gradient: 'from-green-400 to-emerald-500',
            bg: 'from-green-50 to-emerald-50',
            border: 'border-green-100',
            shadow: 'hover:shadow-green-100',
        },
        {
            label: 'Total Patients',
            value: dashboard.patients,
            icon: assets.patients_icon,
            gradient: 'from-purple-500 to-violet-400',
            bg: 'from-purple-50 to-violet-50',
            border: 'border-purple-100',
            shadow: 'hover:shadow-purple-100',
        },
    ]

    return (
        <div className='w-full p-5 sm:p-6'>

            {/* Page Header */}
            <div className='mb-8'>
                <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-blue-100'>
                    Overview
                </span>
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                    Admin <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400'>Dashboard</span>
                </h1>
                <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-3'></div>
            </div>

            {/* Stat Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10'>
                {statCards.map(({ label, value, icon, gradient, bg, border, shadow }) => (
                    <div
                        key={label}
                        className={`relative bg-gradient-to-br ${bg} border ${border} rounded-3xl p-6 shadow-sm hover:shadow-lg ${shadow} hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                    >
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
                    {dashboard.latestAppointments?.length === 0 && (
                        <div className='flex flex-col items-center justify-center py-14 text-center px-6'>
                            <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-3'>
                                <svg className='w-7 h-7 text-blue-400' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                </svg>
                            </div>
                            <p className='font-bold text-gray-600 mb-1'>No recent bookings</p>
                            <p className='text-xs text-gray-400'>New bookings will appear here once made.</p>
                        </div>
                    )}

                    {dashboard.latestAppointments?.map((item) => (
                        <div
                            key={item._id}
                            className='flex items-center justify-between px-6 py-4 hover:bg-blue-50/40 transition-all duration-200'
                        >
                            {/* Doctor Info */}
                            <div className='flex items-center gap-4'>
                                <img
                                    src={item.docData?.image}
                                    alt=''
                                    className='w-11 h-11 rounded-xl object-cover border-2 border-blue-100 flex-shrink-0'
                                />
                                <div>
                                    <p className='font-semibold text-gray-800 text-sm'>{item.docData?.name}</p>
                                    <div className='flex items-center gap-1.5 mt-0.5'>
                                        <svg className='w-3 h-3 text-blue-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                        </svg>
                                        <p className='text-xs text-gray-400'>{slotDateFormat(item.slotDate)} · {item.slotTime}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Status / Action */}
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
                                <button
                                    onClick={() => handleCancelClick(item._id)}
                                    className='w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 border border-red-100 hover:bg-red-500 hover:border-red-500 group transition-all duration-200'
                                >
                                    <img src={assets.cancel_icon} alt='cancel' className='w-4 group-hover:brightness-0 group-hover:invert transition-all duration-200' />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Cancel Confirmation Modal */}
            {modalVisible && (
                <div className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4'>
                    <div className='bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-gray-100'>

                        <div className='w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5'>
                            <svg className='w-7 h-7 text-red-500' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                            </svg>
                        </div>

                        <h3 className='text-xl font-bold text-gray-800 text-center mb-2'>Confirm Cancellation</h3>
                        <p className='text-gray-400 text-sm text-center leading-6 mb-7'>
                            Are you sure you want to cancel this appointment? This action cannot be undone.
                        </p>

                        <div className='flex gap-3'>
                            <button
                                onClick={() => setModalVisible(false)}
                                disabled={loadingCancel}
                                className='flex-1 py-2.5 px-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50'
                            >
                                Keep it
                            </button>
                            <button
                                onClick={confirmCancel}
                                disabled={loadingCancel}
                                className='flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 hover:shadow-lg transition-all duration-200 disabled:opacity-50'
                            >
                                {loadingCancel ? (
                                    <>
                                        <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
                                        Cancelling...
                                    </>
                                ) : 'Yes, Cancel'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard