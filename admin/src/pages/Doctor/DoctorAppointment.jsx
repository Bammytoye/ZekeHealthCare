import React, { useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorAppointment = () => {
    const { dToken, appointments, getAppointments } = useContext(DoctorContext)
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getAppointments()
        }
    }, [dToken])

    return (
        <div className="w-full max-w-6xl m-5">
            <p className="mb-4 text-xl font-semibold text-gray-700">
                All Appointments
            </p>

            <div className="bg-white border rounded-lg shadow-sm text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto">

                {/* Header */}
                <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 py-4 px-6 border-b bg-gray-50 font-medium text-gray-600">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {/* Appointment List */}
                {appointments.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">
                        No appointments found
                    </div>
                ) : (
                    appointments.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 items-center md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 py-4 px-6 border-b hover:bg-gray-50 transition"
                        >
                            {/* Index */}
                            <p className="font-medium text-gray-600">
                                {index + 1}
                            </p>

                            {/* Patient Info */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={item.userData.image}
                                    alt=""
                                    className="w-10 h-10 rounded-full object-cover border"
                                />
                                <p className="font-medium text-gray-700">
                                    {item.userData.name}
                                </p>
                            </div>

                            {/* Payment */}
                            <div>
                                <span
                                    className={`px-3 py-1 text-xs rounded-full font-medium ${item.payment
                                        ? "bg-green-100 text-green-600"
                                        : "bg-yellow-100 text-yellow-600"
                                        }`}
                                >
                                    {item.payment ? "Online" : "Cash"}
                                </span>
                            </div>

                            {/* Age */}
                            <p className="text-gray-600">
                                {calculateAge(item.userData.dob)}
                            </p>

                            {/* Date */}
                            <p className="text-gray-600">
                                {slotDateFormat(item.slotDate)}, {item.slotTime}
                            </p>

                            {/* Fees */}
                            <p className="font-medium text-gray-700">
                                {currency}
                                {item.amount}
                            </p>

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                <button className="p-2 rounded-full hover:bg-red-100 transition">
                                    <img
                                        src={assets.cancel_icon}
                                        alt=""
                                        className="w-6"
                                    />
                                </button>

                                <button className="p-2 rounded-full hover:bg-green-100 transition">
                                    <img
                                        src={assets.tick_icon}
                                        alt=""
                                        className="w-6"
                                    />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )

}

export default DoctorAppointment