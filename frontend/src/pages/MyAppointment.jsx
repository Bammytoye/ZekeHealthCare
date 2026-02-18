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

    // PAYSTACK PAYMENT FUNCTION
    const payOnline = async (appointmentId) => {
        try {
            console.log('🔄 Starting Paystack payment for:', appointmentId)
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

            // Redirect to Paystack payment page
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
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
                My Appointments
            </h2>

            {initialLoading && (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-4 text-gray-600">Loading appointments...</p>
                </div>
            )}

            {!initialLoading && appointments.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <svg
                        className="mx-auto h-16 w-16 text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <p className="text-lg font-medium text-gray-900">No appointments yet</p>
                    <p className="text-sm mt-2">Book your first appointment to get started!</p>
                </div>
            )}

            {!initialLoading && appointments.length > 0 && (
                <div className="space-y-4">
                    {appointments.map((item) => (
                        <div
                            key={item._id}
                            className="grid md:grid-cols-[2fr_1fr] gap-6 py-4 border rounded-lg hover:shadow-md transition-all px-4 bg-white"
                        >
                            <div className="flex gap-4">
                                <img
                                    className="w-28 h-28 object-cover rounded-lg bg-indigo-50 flex-shrink-0"
                                    src={item.docData?.image}
                                    alt={item.docData?.name || 'Doctor'}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/112?text=Doctor'
                                    }}
                                />

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-lg text-gray-900">
                                        {item.docData?.name || 'Doctor Name'}
                                    </p>
                                    <p className="text-sm text-indigo-600 font-medium">
                                        {item.docData?.speciality || 'Speciality'}
                                    </p>

                                    {(item.docData?.address?.line1 || item.docData?.address?.line2) && (
                                        <div className="mt-2">
                                            {item.docData?.address?.line1 && (
                                                <p className="text-sm text-gray-600">
                                                    {item.docData.address.line1}
                                                </p>
                                            )}
                                            {item.docData?.address?.line2 && (
                                                <p className="text-sm text-gray-600">
                                                    {item.docData.address.line2}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <div className="mt-3 space-y-1">
                                        <p className="text-sm">
                                            <span className="font-medium text-gray-700">
                                                📅 Date & Time:
                                            </span>{" "}
                                            <span className="text-gray-900">
                                                {slotDateFormat(item.slotDate)} | {item.slotTime}
                                            </span>
                                        </p>

                                        {item.amount && (
                                            <p className="text-sm">
                                                <span className="font-medium text-gray-700">
                                                    💰 Amount:
                                                </span>{" "}
                                                <span className="text-gray-900 font-semibold">
                                                    ₦{item.amount.toLocaleString()}
                                                </span>
                                            </p>
                                        )}

                                        <p className="text-xs text-gray-500 font-mono">
                                            Ref: {item._id.slice(-8).toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 justify-center">
                                {!item.cancelled && !item.isCompleted && !item.payment && (
                                    <button
                                        onClick={() => payOnline(item._id)}
                                        disabled={loadingPay[item._id] || loadingCancel[item._id]}
                                        className={`py-2.5 px-4 border-2 rounded-lg font-medium transition-all ${loadingPay[item._id] || loadingCancel[item._id]
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                                            : 'hover:bg-primary hover:text-white border-primary text-primary hover:shadow-md'
                                            }`}
                                    >
                                        {loadingPay[item._id] ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></span>
                                                Processing...
                                            </span>
                                        ) : (
                                            '💳 Pay with Paystack'
                                        )}
                                    </button>
                                )}

                                {!item.cancelled && !item.isCompleted && (
                                    <button
                                        onClick={() => {
                                            setSelectedAppointment(item._id)
                                            setShowModal(true)
                                        }}

                                        disabled={loadingPay[item._id] || loadingCancel[item._id]}
                                        className={`py-2.5 px-4 border-2 rounded-lg font-medium transition-all ${loadingPay[item._id] || loadingCancel[item._id]
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                                            : 'hover:bg-red-600 hover:text-white border-red-600 text-red-600 hover:shadow-md'
                                            }`}
                                    >
                                        {loadingCancel[item._id] ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></span>
                                                Cancelling...
                                            </span>
                                        ) : (
                                            '❌ Cancel Appointment'
                                        )}
                                    </button>
                                )}

                                {item.payment && !item.isCompleted && !item.cancelled && (
                                    <div className="py-2.5 px-4 text-green-700 text-sm text-center font-semibold bg-green-100 rounded-lg border-2 border-green-300">
                                        ✓ Payment Complete
                                    </div>
                                )}

                                {item.cancelled && (
                                    <div className="py-2.5 px-4 text-red-700 text-sm text-center font-semibold bg-red-100 rounded-lg border-2 border-red-300">
                                        ✗ Appointment Cancelled
                                    </div>
                                )}

                                {item.isCompleted && (
                                    <div className="py-2.5 px-4 text-blue-700 text-sm text-center font-semibold bg-blue-100 rounded-lg border-2 border-blue-300">
                                        ✓ Appointment Completed
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">

                        <h3 className="text-xl font-semibold">
                            Cancel Appointment
                        </h3>

                        <p className="mt-3 text-gray-600">
                            Are you sure you want to cancel this appointment?
                        </p>

                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                onClick={() => {
                                    setShowModal(false)
                                    setSelectedAppointment(null)
                                }}
                                className="px-4 py-2 border rounded-lg"
                            >
                                No
                            </button>

                            <button
                                onClick={() => {
                                    cancelAppointment(selectedAppointment)
                                    setShowModal(false)
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Yes, Cancel
                            </button>

                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default MyAppointments