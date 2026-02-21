import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const Appointments = () => {

    const { aToken, appointments, getAllAppointments, cancelAppointments } = useContext(AdminContext)
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
    const [showModal, setShowModal] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    const confirmCancel = async () => {
        await cancelAppointments(selectedId)
        setShowModal(false)
        setSelectedId(null)
    }


    useEffect(() => {
        if (aToken) {
            getAllAppointments()
        }
    }, [aToken])

    return (
        <div className="w-full max-w-7xl mx-auto p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">
                    All Appointments
                </h1>
                <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium">
                    {appointments?.length || 0} Records
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow border overflow-hidden">

                {/* Table Header */}
                <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2fr_2fr_1fr_1.5fr] bg-gray-50 text-gray-500 text-sm font-semibold px-6 py-4 border-b">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p className="text-center">Actions</p>
                </div>

                {/* Table Body */}
                <div className="max-h-[70vh] overflow-y-auto">

                    {appointments?.length === 0 && (
                        <div className="text-center py-20 text-gray-400">
                            No Appointments Found
                        </div>
                    )}

                    {appointments?.map((item, index) => {
                        return (
                            <div
                                key={item._id}
                                className="grid md:grid-cols-[0.5fr_2.5fr_1fr_2fr_2fr_1fr_1.5fr] items-center gap-4 px-6 py-4 border-b text-sm hover:bg-gray-50 transition"
                            >
                                <p className="text-gray-400">{index + 1}</p>

                                {/* Patient */}
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.userData?.image}
                                        alt={item.userData?.name}
                                        className="w-10 h-10 rounded-full object-cover border"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {item.userData?.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {item.userData?.email}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-600">
                                    {calculateAge(item.userData.dob)}
                                </p>

                                <p className="text-gray-600">
                                    {slotDateFormat(item.slotDate)} <br />
                                    <span className="text-xs text-gray-400">
                                        {item.slotTime}
                                    </span>
                                </p>

                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.docData?.image}
                                        alt={item.docData?.name}
                                        className="w-10 h-10 rounded-full object-cover border"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-700">
                                            {item.docData?.name}
                                        </p>
                                    </div>
                                </div>

                                <p className="font-semibold text-gray-800">
                                    {currency}{item.amount}
                                </p>

                                {/* Actions */}
                                <div className="flex items-center justify-center gap-2">
                                    {
                                        item.cancelled ?
                                            <p className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-full">
                                                Cancelled
                                            </p>

                                            : item.isCompleted 
                                            ? <p className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">
                                                Completed
                                            </p> 
                                            : <img
                                                onClick={() => {
                                                    setSelectedId(item._id)
                                                    setShowModal(true)
                                                }}
                                                src={assets.cancel_icon}
                                                alt="cancel"
                                                className="cursor-pointer w-6"
                                            />
                                    }
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">

                        <h2 className="text-lg font-semibold text-gray-800 mb-3">
                            Cancel Appointment?
                        </h2>

                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to cancel this appointment?
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50"
                            >
                                No, Keep It
                            </button>

                            <button
                                onClick={confirmCancel}
                                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
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

export default Appointments
