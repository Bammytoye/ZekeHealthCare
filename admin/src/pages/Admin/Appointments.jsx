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
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3">
                <div>
                    <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-1">Dashboard</p>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                        All Appointments
                    </h1>
                </div>
                <div className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md shadow-indigo-200">
                    <span className="w-2 h-2 rounded-full bg-indigo-300 animate-pulse"></span>
                    {appointments?.length || 0} Records
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Table Header */}
                <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2fr_2fr_1fr_1.5fr] bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-xs font-bold uppercase tracking-widest px-4 sm:px-6 py-4">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p className="text-center">Actions</p>
                </div>

                {/* Table Body */}
                <div className="max-h-[70vh] overflow-y-auto divide-y divide-gray-50">
                    {appointments?.length === 0 && (
                        <div className="text-center py-20 text-gray-300 text-sm sm:text-base font-medium tracking-wide">
                            No Appointments Found
                        </div>
                    )}

                    {appointments?.map((item, index) => (
                        <div
                            key={item._id}
                            className="grid md:grid-cols-[0.5fr_2.5fr_1fr_2fr_2fr_1fr_1.5fr] gap-3 md:gap-4 items-center px-4 sm:px-6 py-4 text-sm hover:bg-indigo-50/40 transition-colors duration-150 group"
                        >
                            <p className="text-gray-300 font-bold text-xs sm:text-sm group-hover:text-indigo-400 transition-colors">{index + 1}</p>

                            {/* Patient */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <img
                                    src={item.userData?.image}
                                    alt={item.userData?.name}
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div className="overflow-hidden">
                                    <p className="font-semibold text-gray-800 truncate text-sm">{item.userData?.name}</p>
                                    <p className="text-xs text-gray-400 truncate">{item.userData?.email}</p>
                                </div>
                            </div>

                            <p className="text-gray-500 text-xs sm:text-sm font-medium">{calculateAge(item.userData.dob)}</p>

                            <p className="text-gray-600 text-xs sm:text-sm">
                                <span className="font-medium text-gray-700">{slotDateFormat(item.slotDate)}</span>
                                <br />
                                <span className="text-xs text-gray-400">{item.slotTime}</span>
                            </p>

                            <div className="flex items-center gap-2 sm:gap-3">
                                <img
                                    src={item.docData?.image}
                                    alt={item.docData?.name}
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div className="overflow-hidden">
                                    <p className="font-semibold text-gray-700 truncate text-sm">{item.docData?.name}</p>
                                </div>
                            </div>

                            <p className="font-bold text-gray-800 text-xs sm:text-sm">{currency}{item.amount}</p>

                            {/* Actions */}
                            <div className="flex items-center justify-center gap-1 sm:gap-2">
                                {item.cancelled ? (
                                    <p className="text-xs px-2 sm:px-3 py-1 bg-red-50 text-red-500 rounded-lg font-semibold border border-red-100">Cancelled</p>
                                ) : item.isCompleted ? (
                                    <p className="text-xs px-2 sm:px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg font-semibold border border-emerald-100">Completed</p>
                                ) : (
                                    <img
                                        onClick={() => {
                                            setSelectedId(item._id)
                                            setShowModal(true)
                                        }}
                                        src={assets.cancel_icon}
                                        alt="cancel"
                                        className="cursor-pointer w-5 sm:w-6 opacity-90 hover:opacity-100"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                            Cancel Appointment?
                        </h2>
                        <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">
                            Are you sure you want to cancel this appointment? This action cannot be undone.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2.5 text-sm sm:text-base rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors w-full sm:w-auto"
                            >
                                No, Keep It
                            </button>
                            <button
                                onClick={confirmCancel}
                                className="px-5 py-2.5 text-sm sm:text-base rounded-xl bg-red-500 text-white hover:bg-red-600 font-semibold transition-colors shadow-md shadow-red-100 w-full sm:w-auto"
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