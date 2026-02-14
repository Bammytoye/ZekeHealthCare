// components/MyAppointments.jsx
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContent } from '../context/AppContent'

const MyAppointments = () => {
    const { backendURL, token, getDoctorsData } = useContext(AppContent)
    const [appointments, setAppointments] = useState([])

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    // Format slotDate to "DD MMM YYYY"
    const slotDateFormat = (slotDate) => {
        if (!slotDate) return ''
        const [day, month, year] = slotDate.split('/')
        return `${day} ${months[Number(month) - 1]} ${year}`
    }

    // Fetch user appointments
    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/user/get-appointment`, { headers: { token } })
            if (data.success) setAppointments(data.appointments.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Cancel appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendURL}/user/cancel-appointment`,
                { appointmentId },
                { headers: { token } }
            )
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
                getDoctorsData()
            } else toast.error(data.message)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Initiate Flutterwave payment
    const payOnline = async (appointmentId) => {
        try {
            // 1️⃣ Request backend to create Flutterwave order
            const { data } = await axios.post(
                `${backendURL}/user/payment-appointment`,
                { appointmentId },
                { headers: { token } }
            )

            if (!data.success) return toast.error(data.message)

            const order = data.order

            // 2️⃣ Launch FlutterwaveCheckout
            window.FlutterwaveCheckout({
                public_key: import.meta.env.FLUTTERWAVE_KEY_ID,
                tx_ref: order.tx_ref,
                amount: order.amount,
                currency: order.currency,
                country: "NG",
                customer: {
                    email: order.customer?.email || 'customer@example.com',
                    phone_number: order.customer?.phone || '08000000000',
                    name: order.customer?.name || 'Customer'
                },
                payment_options: "card,ussd,qr",
                callback: async (response) => {
                    console.log('Flutterwave response:', response)
                    // Optionally verify payment on backend here
                    toast.success('Payment successful!')
                    getUserAppointments()
                    getDoctorsData()
                },
                onclose: () => {
                    console.log('Payment closed')
                },
                customizations: {
                    title: "My Appointment",
                    description: "Payment for appointment",
                    logo: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1688477807/My%20Appointment/logo.png",
                },
            })
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) getUserAppointments()
    }, [token])

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">My Appointments</h2>

            {appointments.length === 0 && <p>No appointments booked yet.</p>}

            {appointments.map((item, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_2fr] gap-4 py-2 border-b items-center">
                    <img className="w-32 bg-indigo-50" src={item.docData?.image} alt={item.docData?.name} />
                    <div>
                        <p className="font-semibold">{item.docData?.name}</p>
                        <p>{item.docData?.speciality}</p>
                        <p className="font-medium mt-1">Address:</p>
                        <p className="text-xs">{item.docData?.address?.line1}</p>
                        <p className="text-xs">{item.docData?.address?.line2}</p>
                        <p className="text-xs mt-1">
                            <span className="font-medium">Date & Time: </span>
                            {slotDateFormat(item.slotDate)} | {item.slotTime}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 justify-end">
                        {!item.cancelled && (
                            <button
                                onClick={() => payOnline(item._id)}
                                className="text-sm text-stone-500 py-2 border hover:bg-primary hover:text-white transition-all duration-300"
                            >
                                Pay Online
                            </button>
                        )}
                        {!item.cancelled && (
                            <button
                                onClick={() => cancelAppointment(item._id)}
                                className="text-sm text-stone-500 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300"
                            >
                                Cancel Appointment
                            </button>
                        )}
                        {item.cancelled && (
                            <button className="py-2 border border-red-500 text-red-500 text-sm rounded">
                                Appointment Cancelled
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyAppointments
