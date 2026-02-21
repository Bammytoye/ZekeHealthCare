import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContent } from '../context/AppContent'

const MyAppointments = () => {
    const { backendURL, token, getDoctorsData } = useContext(AppContent)
    const [appointments, setAppointments] = useState([])
    const [initialLoading, setInitialLoading] = useState(true)
    const [loadingPay, setLoadingPay] = useState({})
    const [loadingCancel, setLoadingCancel] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState(null)

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const slotDateFormat = (slotDate) => {
        if (!slotDate) return ''
        try {
            const [day, month, year] = slotDate.split('/')
            return `${day} ${months[Number(month) - 1]} ${year}`
        } catch (error) {
            return slotDate
        }
    }

    const getUserAppointments = async () => {
        try {
            setInitialLoading(true)
            const { data } = await axios.get(
                `${backendURL}/user/get-appointment`,
                { headers: { token } }
            )
            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
        } catch (error) {
            console.error('Error fetching appointments:', error)
            toast.error(error.response?.data?.message || 'Failed to load appointments')
        } finally {
            setInitialLoading(false)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            setLoadingCancel(prev => ({ ...prev, [appointmentId]: true }))
            const { data } = await axios.post(
                `${backendURL}/user/cancel-appointment`,
                { appointmentId },
                { headers: { token } }
            )
            if (data.success) {
                toast.success(data.message || 'Appointment cancelled successfully')
                getUserAppointments()
                getDoctorsData()
            } else {
                toast.error(data.message || 'Failed to cancel appointment')
            }
        } catch (error) {
            console.error('Error cancelling appointment:', error)
            toast.error(error.response?.data?.message || 'Failed to cancel appointment')
        } finally {
            setLoadingCancel(prev => ({ ...prev, [appointmentId]: false }))
        }
    }

    const payOnline = async (appointmentId) => {
        try {
            console.log('Starting Paystack payment for:', appointmentId)
            setLoadingPay(prev => ({ ...prev, [appointmentId]: true }))
            const { data } = await axios.post(
                `${backendURL}/user/payment-appointment`,
                { appointmentId },
                { headers: { token } }
            )
            console.log('📦 Backend response:', data)
            if (!data.success) {
                setLoadingPay(prev => ({ ...prev, [appointmentId]: false }))
                return toast.error(data.message || 'Failed to initiate payment')
            }
            console.log('✅ Redirecting to Paystack payment page...')
            window.location.href = data.authorizationUrl
        } catch (error) {
            console.error('💥 Error initiating payment:', error)
            toast.error(error.response?.data?.message || 'Failed to initiate payment')
            setLoadingPay(prev => ({ ...prev, [appointmentId]: false }))
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 sm:px-6 md:px-10 py-10'>
            <div className='max-w-4xl mx-auto'>

                {/* Page Header */}
                <div className='mb-8'>
                    <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3'>Dashboard</span>
                    <h2 className='text-3xl sm:text-4xl font-bold text-gray-800'>
                        My <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400'>Appointments</span>
                    </h2>
                    <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-3'></div>
                </div>

                {/* Loading State */}
                {initialLoading && (
                    <div className='flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100'>
                        <div className='relative w-14 h-14'>
                            <div className='absolute inset-0 rounded-full border-4 border-blue-100'></div>
                            <div className='absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin'></div>
                        </div>
                        <p className='mt-5 text-gray-500 font-medium'>Loading your appointments...</p>
                    </div>
                )}

                {/* Empty State */}
                {!initialLoading && appointments.length === 0 && (
                    <div className='flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 text-center px-6'>
                        <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-5'>
                            <svg className='w-10 h-10 text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                            </svg>
                        </div>
                        <p className='text-xl font-bold text-gray-800 mb-2'>No appointments yet</p>
                        <p className='text-gray-400 text-sm max-w-xs'>Book your first appointment with one of our 100+ trusted doctors to get started!</p>
                    </div>
                )}

                {/* Appointments List */}
                {!initialLoading && appointments.length > 0 && (
                    <div className='flex flex-col gap-5'>
                        {appointments.map((item) => (
                            <div
                                key={item._id}
                                className='bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden'
                            >
                                <div className='flex flex-col md:flex-row'>

                                    {/* Doctor Info */}
                                    <div className='flex gap-4 p-5 sm:p-6 flex-1'>
                                        <div className='relative flex-shrink-0'>
                                            <img
                                                className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl bg-blue-50 border-2 border-blue-100'
                                                src={item.docData?.image}
                                                alt={item.docData?.name || 'Doctor'}
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/112?text=Doctor' }}
                                            />
                                        </div>

                                        <div className='flex-1 min-w-0'>
                                            <p className='font-bold text-lg text-gray-800 leading-tight'>
                                                {item.docData?.name || 'Doctor Name'}
                                            </p>
                                            <span className='inline-block mt-1 text-xs font-semibold text-blue-500 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100'>
                                                {item.docData?.speciality || 'Speciality'}
                                            </span>

                                            {(item.docData?.address?.line1 || item.docData?.address?.line2) && (
                                                <div className='flex items-start gap-1.5 mt-2'>
                                                    <svg className='w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                                    </svg>
                                                    <p className='text-xs text-gray-500 leading-5'>
                                                        {item.docData?.address?.line1}{item.docData?.address?.line2 && `, ${item.docData.address.line2}`}
                                                    </p>
                                                </div>
                                            )}

                                            <div className='flex flex-wrap gap-3 mt-3'>
                                                <div className='flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-1.5 border border-gray-100'>
                                                    <svg className='w-3.5 h-3.5 text-blue-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                                    </svg>
                                                    <span className='text-xs font-medium text-gray-700'>{slotDateFormat(item.slotDate)} · {item.slotTime}</span>
                                                </div>

                                                {item.amount && (
                                                    <div className='flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-1.5 border border-gray-100'>
                                                        <svg className='w-3.5 h-3.5 text-cyan-500' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' />
                                                        </svg>
                                                        <span className='text-xs font-bold text-gray-700'>₦{item.amount.toLocaleString()}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <p className='mt-2 text-xs text-gray-300 font-mono tracking-wide'>
                                                REF: {item._id.slice(-8).toUpperCase()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions Panel */}
                                    <div className='flex flex-row md:flex-col gap-3 justify-end p-5 sm:p-6 md:border-l border-t md:border-t-0 border-gray-100 md:min-w-[190px] md:justify-center bg-gray-50 md:bg-white rounded-b-3xl md:rounded-none md:rounded-r-3xl'>

                                        {!item.cancelled && !item.isCompleted && !item.payment && (
                                            <button
                                                onClick={() => payOnline(item._id)}
                                                disabled={loadingPay[item._id] || loadingCancel[item._id]}
                                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                                    loadingPay[item._id] || loadingCancel[item._id]
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:shadow-lg hover:scale-105'
                                                }`}
                                            >
                                                {loadingPay[item._id] ? (
                                                    <>
                                                        <span className='inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent'></span>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' />
                                                        </svg>
                                                        Pay Now
                                                    </>
                                                )}
                                            </button>
                                        )}

                                        {!item.cancelled && !item.isCompleted && (
                                            <button
                                                onClick={() => { setSelectedAppointment(item._id); setShowModal(true) }}
                                                disabled={loadingPay[item._id] || loadingCancel[item._id]}
                                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                                    loadingPay[item._id] || loadingCancel[item._id]
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white'
                                                }`}
                                            >
                                                {loadingCancel[item._id] ? (
                                                    <>
                                                        <span className='inline-block animate-spin rounded-full h-4 w-4 border-2 border-red-400 border-t-transparent'></span>
                                                        Cancelling...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                                                        </svg>
                                                        Cancel
                                                    </>
                                                )}
                                            </button>
                                        )}

                                        {item.payment && !item.isCompleted && !item.cancelled && (
                                            <div className='flex items-center justify-center gap-2 py-2.5 px-4 text-green-700 text-sm font-semibold bg-green-50 rounded-xl border-2 border-green-200'>
                                                <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                                                </svg>
                                                Paid
                                            </div>
                                        )}

                                        {item.cancelled && !item.isCompleted && (
                                            <div className='flex items-center justify-center gap-2 py-2.5 px-4 text-red-600 text-sm font-semibold bg-red-50 rounded-xl border-2 border-red-200'>
                                                <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                                                </svg>
                                                Cancelled
                                            </div>
                                        )}

                                        {item.isCompleted && !item.cancelled && (
                                            <div className='flex items-center justify-center gap-2 py-2.5 px-4 text-blue-700 text-sm font-semibold bg-blue-50 rounded-xl border-2 border-blue-200'>
                                                <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                                </svg>
                                                Completed
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Cancel Confirmation Modal */}
                {showModal && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4'>
                        <div className='bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-gray-100'>

                            <div className='w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5'>
                                <svg className='w-7 h-7 text-red-500' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                                </svg>
                            </div>

                            <h3 className='text-xl font-bold text-gray-800 text-center mb-2'>Cancel Appointment</h3>
                            <p className='text-gray-500 text-sm text-center leading-6 mb-7'>
                                Are you sure you want to cancel this appointment? This action cannot be undone.
                            </p>

                            <div className='flex gap-3'>
                                <button
                                    onClick={() => { setShowModal(false); setSelectedAppointment(null) }}
                                    className='flex-1 py-2.5 px-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200'
                                >
                                    Keep it
                                </button>
                                <button
                                    onClick={() => { cancelAppointment(selectedAppointment); setShowModal(false) }}
                                    className='flex-1 py-2.5 px-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 hover:shadow-lg transition-all duration-200'
                                >
                                    Yes, Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyAppointments