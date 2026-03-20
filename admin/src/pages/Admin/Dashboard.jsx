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

    const isDemo = aToken === "demo-admin-token"

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

    // ✅block demo click
    const handleCancelClick = (appointmentId) => {
        if (isDemo) {
            alert("🚀 Demo mode: Cannot cancel appointments")
            return
        }
        setSelectedAppointment(appointmentId)
        setModalVisible(true)
    }

    const confirmCancel = async () => {
        if (isDemo) {
            setModalVisible(false)
            alert("🚀 Demo mode: Action disabled")
            return
        }

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
            {/* demo */}
            {isDemo && (
                <div className="bg-yellow-100 text-yellow-700 text-sm text-center py-2 rounded-lg mb-4">
                    🚀 Demo Mode: You can explore but actions are disabled
                </div>
            )}

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

                <div className='flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-100'>
                    <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow'>
                        <img src={assets.list_icon} alt='' className='w-4 brightness-0 invert' />
                    </div>
                    <p className='font-bold text-gray-700 text-sm uppercase tracking-widest'>Latest Bookings</p>
                </div>

                <div className='divide-y divide-gray-50'>
                    {dashboard.latestAppointments?.map((item) => (
                        <div
                            key={item._id}
                            className='flex items-center justify-between px-6 py-4 hover:bg-blue-50/40 transition-all duration-200'
                        >
                            <div className='flex items-center gap-4'>
                                <img
                                    src={item.docData?.image}
                                    alt=''
                                    className='w-11 h-11 rounded-xl object-cover border-2 border-blue-100 flex-shrink-0'
                                />
                                <div>
                                    <p className='font-semibold text-gray-800 text-sm'>{item.docData?.name}</p>
                                    <p className='text-xs text-gray-400'>
                                        {slotDateFormat(item.slotDate)} · {item.slotTime}
                                    </p>
                                </div>
                            </div>

                            {/* Status */}
                            {item.cancelled ? (
                                <span className='text-red-500 text-xs'>Cancelled</span>
                            ) : item.isCompleted ? (
                                <span className='text-green-600 text-xs'>Completed</span>
                            ) : (
                                <button
                                    onClick={() => handleCancelClick(item._id)}
                                    className='text-red-500 text-xs'
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modalVisible && (
                <div className='fixed inset-0 flex items-center justify-center bg-black/40 z-50'>
                    <div className='bg-white p-6 rounded-xl'>
                        <p>Confirm Cancel?</p>

                        <button onClick={() => setModalVisible(false)}>
                            No
                        </button>

                        <button onClick={confirmCancel}>
                            Yes
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard