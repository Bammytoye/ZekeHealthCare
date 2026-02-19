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

    if (!dashboard) return <div className="p-6 text-gray-500">Loading dashboard...</div>

    // ✅ Handle cancel click
    const handleCancelClick = (appointmentId) => {
        setSelectedAppointment(appointmentId)
        setModalVisible(true)
    }

    // ✅ Confirm cancellation
    const confirmCancel = async () => {
        if (!selectedAppointment) return
        setLoadingCancel(true)
        try {
            await cancelAppointments(selectedAppointment)
            await getDashboard() // Auto-refresh after cancel
            setModalVisible(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingCancel(false)
            setSelectedAppointment(null)
        }
    }

    return (
        <div className="w-full p-6">

            {/* Title */}
            <h1 className="text-2xl font-semibold text-gray-800 mb-8">
                Admin Dashboard
            </h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Doctors */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 flex justify-between items-center hover:shadow-md transition">
                    <div>
                        <p className="text-gray-500 text-sm">Total Doctors</p>
                        <h2 className="text-3xl font-bold">{dashboard.doctors}</h2>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-xl">
                        <img src={assets.doctor_icon} alt="" className="w-8" />
                    </div>
                </div>
                {/* Appointments */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 flex justify-between items-center hover:shadow-md transition">
                    <div>
                        <p className="text-gray-500 text-sm">Total Appointments</p>
                        <h2 className="text-3xl font-bold">{dashboard.appointments}</h2>
                    </div>
                    <div className="bg-green-100 p-4 rounded-xl">
                        <img src={assets.appointments_icon} alt="" className="w-8" />
                    </div>
                </div>
                {/* Patients */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 flex justify-between items-center hover:shadow-md transition">
                    <div>
                        <p className="text-gray-500 text-sm">Total Patients</p>
                        <h2 className="text-3xl font-bold">{dashboard.patients}</h2>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-xl">
                        <img src={assets.patients_icon} alt="" className="w-8" />
                    </div>
                </div>
            </div>

            {/* Latest Bookings */}
            <div className="bg-white rounded-2xl shadow-sm border mt-10">
                <div className="flex items-center gap-3 px-6 py-4 border-b bg-gray-50 rounded-t-2xl">
                    <img src={assets.list_icon} alt="" className="w-5" />
                    <p className="font-semibold text-gray-700">
                        Latest Bookings
                    </p>
                </div>

                <div className="divide-y">
                    {dashboard.latestAppointments?.length === 0 && (
                        <p className="p-6 text-gray-400 text-sm">
                            No recent bookings
                        </p>
                    )}

                    {dashboard.latestAppointments?.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
                        >
                            {/* Doctor Info */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.docData?.image}
                                    alt=""
                                    className="w-12 h-12 rounded-full object-cover border"
                                />
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {item.docData?.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {slotDateFormat(item.slotDate)} | {item.slotTime}
                                    </p>
                                </div>
                            </div>

                            {/* Action */}
                            {item.cancelled ? (
                                <span className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-full">
                                    Cancelled
                                </span>
                            ) : (
                                <img
                                    onClick={() => handleCancelClick(item._id)}
                                    src={assets.cancel_icon}
                                    alt="cancel"
                                    className="cursor-pointer w-6 hover:scale-110 transition"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Confirmation Modal */}
            {modalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>
                        <p className="mb-6 text-gray-600">
                            Are you sure you want to cancel this appointment?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setModalVisible(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                                disabled={loadingCancel}
                            >
                                No
                            </button>
                            <button
                                onClick={confirmCancel}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                disabled={loadingCancel}
                            >
                                {loadingCancel ? "Cancelling..." : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard
