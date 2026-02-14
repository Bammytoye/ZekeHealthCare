// components/MyAppointments.jsx
// FIXED VERSION - All bugs resolved
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContent } from '../context/AppContent'

const MyAppointments = () => {
    const { backendURL, token, getDoctorsData } = useContext(AppContent)
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState({}) // Track loading state per appointment

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const slotDateFormat = (slotDate) => {
        if (!slotDate) return ''
        const [day, month, year] = slotDate.split('/')
        return `${day} ${months[Number(month) - 1]} ${year}`
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(
                `${backendURL}/user/get-appointment`,
                { headers: { token } }
            )
            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
        } catch (error) {
            console.error('Error fetching appointments:', error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            // Set loading state for this appointment
            setLoading(prev => ({ ...prev, [appointmentId]: true }))

            const { data } = await axios.post(
                `${backendURL}/user/cancel-appointment`,
                { appointmentId },
                { headers: { token } }
            )
            
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
                getDoctorsData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error cancelling appointment:', error)
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(prev => ({ ...prev, [appointmentId]: false }))
        }
    }

    const payOnline = async (appointmentId) => {
        try {
            // Set loading state
            setLoading(prev => ({ ...prev, [appointmentId]: true }))

            const { data } = await axios.post(
                `${backendURL}/user/payment-appointment`,
                { appointmentId },
                { headers: { token } }
            )

            if (!data.success) {
                setLoading(prev => ({ ...prev, [appointmentId]: false }))
                return toast.error(data.message)
            }

            const order = data.order

            // Check if Flutterwave SDK is loaded
            if (!window.FlutterwaveCheckout) {
                setLoading(prev => ({ ...prev, [appointmentId]: false }))
                return toast.error('Payment system not loaded. Please refresh the page.')
            }

            window.FlutterwaveCheckout({
                public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
                tx_ref: order.tx_ref,
                amount: order.amount,
                currency: order.currency,
                customer: order.customer,
                payment_options: "card,ussd,qr",

                callback: async (response) => {
                    try {
                        // Verify payment with backend
                        const verifyRes = await axios.post(
                            `${backendURL}/user/verify-payment`,
                            {
                                transaction_id: response.transaction_id,
                                appointmentId
                            },
                            { headers: { token } }
                        )

                        if (verifyRes.data.success) {
                            toast.success(verifyRes.data.message || "Payment successful!")
                            getUserAppointments()
                            getDoctorsData()
                        } else {
                            toast.error(verifyRes.data.message || "Payment verification failed")
                        }
                    } catch (error) {
                        console.error("Payment verification error:", error)
                        toast.error(error.response?.data?.message || "Payment verification failed. Please contact support.")
                    } finally {
                        setLoading(prev => ({ ...prev, [appointmentId]: false }))
                    }
                },

                onclose: () => {
                    console.log("Payment modal closed")
                    setLoading(prev => ({ ...prev, [appointmentId]: false }))
                },

                customizations: {
                    title: "Appointment Payment",
                    description: "Payment for doctor appointment",
                    logo: "https://your-logo-url.com/logo.png" // Add your logo URL
                },
            })
        } catch (error) {
            console.error('Error initiating payment:', error)
            toast.error(error.response?.data?.message || error.message)
            setLoading(prev => ({ ...prev, [appointmentId]: false }))
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

            {appointments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <p className="text-lg">No appointments booked yet.</p>
                    <p className="text-sm mt-2">Book your first appointment to get started!</p>
                </div>
            )}

            <div className="space-y-4">
                {appointments.map((item) => (
                    <div
                        key={item._id}
                        className="grid md:grid-cols-[2fr_1fr] gap-6 py-4 border-b hover:bg-gray-50 transition-colors rounded-lg px-4"
                    >
                        <div className="flex gap-4">
                            <img
                                className="w-28 h-28 object-cover rounded bg-indigo-50"
                                src={item.docData?.image}
                                alt={item.docData?.name || 'Doctor'}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/112?text=Doctor'
                                }}
                            />

                            <div className="flex-1">
                                <p className="font-semibold text-lg">
                                    {item.docData?.name || 'Doctor Name'}
                                </p>
                                <p className="text-gray-600">
                                    {item.docData?.speciality || 'Speciality'}
                                </p>

                                <p className="mt-2 text-sm text-gray-600">
                                    {item.docData?.address?.line1}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {item.docData?.address?.line2}
                                </p>

                                <p className="mt-2 text-sm">
                                    <span className="font-medium text-gray-700">
                                        Date & Time:
                                    </span>{" "}
                                    <span className="text-gray-900">
                                        {slotDateFormat(item.slotDate)} | {item.slotTime}
                                    </span>
                                </p>

                                {item.amount && (
                                    <p className="mt-1 text-sm">
                                        <span className="font-medium text-gray-700">
                                            Amount:
                                        </span>{" "}
                                        <span className="text-gray-900">
                                            ₦{item.amount.toLocaleString()}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 justify-center">
                            {/* Show Pay Online button only if not cancelled, not completed, and not paid */}
                            {!item.cancelled && !item.isCompleted && !item.paid && (
                                <button
                                    onClick={() => payOnline(item._id)}
                                    disabled={loading[item._id]}
                                    className={`py-2 px-4 border rounded font-medium transition ${
                                        loading[item._id]
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'hover:bg-primary hover:text-white border-primary text-primary'
                                    }`}
                                >
                                    {loading[item._id] ? 'Processing...' : 'Pay Online'}
                                </button>
                            )}

                            {/* Show Cancel button only if not cancelled and not completed */}
                            {!item.cancelled && !item.isCompleted && (
                                <button
                                    onClick={() => cancelAppointment(item._id)}
                                    disabled={loading[item._id]}
                                    className={`py-2 px-4 border rounded font-medium transition ${
                                        loading[item._id]
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'
                                    }`}
                                >
                                    {loading[item._id] ? 'Cancelling...' : 'Cancel Appointment'}
                                </button>
                            )}

                            {/* Show payment status */}
                            {item.paid && !item.isCompleted && !item.cancelled && (
                                <span className="py-2 px-4 text-green-600 text-sm text-center font-medium bg-green-50 rounded">
                                    ✓ Payment Complete
                                </span>
                            )}

                            {/* Show cancelled status */}
                            {item.cancelled && (
                                <span className="py-2 px-4 text-red-500 text-sm text-center font-medium bg-red-50 rounded">
                                    ✗ Appointment Cancelled
                                </span>
                            )}

                            {/* Show completed status */}
                            {item.isCompleted && (
                                <span className="py-2 px-4 text-blue-600 text-sm text-center font-medium bg-blue-50 rounded">
                                    ✓ Appointment Completed
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments