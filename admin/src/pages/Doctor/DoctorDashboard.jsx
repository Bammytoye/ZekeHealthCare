import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
    const { dToken, getDashData, dashData, setDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
    const { currency, slotDateFormat } = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getDashData()
        }
    }, [dToken])

    return dashData && (
        <div className='m-5'>
            {/* Title */}
            <h1 className="text-2xl font-semibold text-gray-800 mb-8">
                Doctor Dashboard
            </h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Doctors */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 flex justify-between items-center hover:shadow-md transition">
                    <div>
                        <p className="text-gray-500 text-sm">Earning</p>
                        <h2 className="text-3xl font-bold">{currency}{dashData.earning}</h2>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-xl">
                        <img src={assets.earning_icon} alt="" className="w-8" />
                    </div>
                </div>
                {/* Appointments */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 flex justify-between items-center hover:shadow-md transition">
                    <div>
                        <p className="text-gray-500 text-sm">Total Appointments</p>
                        <h2 className="text-3xl font-bold">{dashData.appointments}</h2>
                    </div>
                    <div className="bg-green-100 p-4 rounded-xl">
                        <img src={assets.appointments_icon} alt="" className="w-8" />
                    </div>
                </div>
                {/* Patients */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 flex justify-between items-center hover:shadow-md transition">
                    <div>
                        <p className="text-gray-500 text-sm">Total Patients</p>
                        <h2 className="text-3xl font-bold">{dashData.patients}</h2>
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
                    {dashData.latestAppointments?.length === 0 && (
                        <p className="p-6 text-gray-400 text-sm">
                            No recent bookings
                        </p>
                    )}

                    {dashData.latestAppointments?.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
                        >
                            {/* Doctor Info */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.userData?.image}
                                    alt=""
                                    className="w-12 h-12 rounded-full object-cover border"
                                />
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {item.userData?.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {slotDateFormat(item.slotDate)} | {item.slotTime}
                                    </p>
                                </div>
                            </div>

                            {/* Action */}
                            {
                                item.cancelled ?
                                    <p className='text-red-400 text-xs font-medium' >Cancelled</p>
                                    : item.isCompleted ?
                                        <p className='text-green-500 text-xs'>Completed</p> :
                                        <div className="flex items-center ">
                                            <button className="p-2 rounded-full hover:bg-red-100 transition cursor-pointer">
                                                <img
                                                    onClick={() => cancelAppointment(item._id)}
                                                    src={assets.cancel_icon}
                                                    alt=""
                                                    className="w-6"
                                                />
                                            </button>

                                            <button className="p-2 rounded-full hover:bg-green-100 transition cursor-pointer">
                                                <img
                                                    onClick={() => completeAppointment(item._id)}
                                                    src={assets.tick_icon}
                                                    alt=""
                                                    className="w-6"
                                                />
                                            </button>
                                        </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard