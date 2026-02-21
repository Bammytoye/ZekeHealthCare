import React, { useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorAppointment = () => {
    const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getAppointments()
        }
    }, [dToken])

    return (
        <div className='w-full max-w-6xl m-5'>

            {/* Header */}
            <div className='mb-6'>
                <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-blue-100'>
                    Schedule
                </span>
                <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                    All <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400'>Appointments</span>
                </h2>
                <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-3'></div>
            </div>

            <div className='bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden'>

                {/* Table Header */}
                <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 py-4 px-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-100'>
                    {['#', 'Patient', 'Payment', 'Age', 'Date & Time', 'Fees', 'Action'].map(h => (
                        <p key={h} className='text-xs font-bold text-gray-500 uppercase tracking-widest'>{h}</p>
                    ))}
                </div>

                {/* Empty State */}
                {appointments.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-20 text-center px-6'>
                        <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-4'>
                            <svg className='w-8 h-8 text-blue-400' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                            </svg>
                        </div>
                        <p className='text-lg font-bold text-gray-700 mb-1'>No appointments yet</p>
                        <p className='text-sm text-gray-400'>Patient appointments will appear here once booked.</p>
                    </div>
                ) : (
                    <div className='divide-y divide-gray-50 max-h-[72vh] overflow-y-auto'>
                        {appointments.reverse().map((item, index) => (
                            <div
                                key={index}
                                className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 items-center py-4 px-6 hover:bg-blue-50/40 transition-all duration-200'
                            >
                                {/* Index */}
                                <p className='text-xs font-bold text-gray-300 hidden md:block'>{index + 1}</p>

                                {/* Patient */}
                                <div className='flex items-center gap-3'>
                                    <img
                                        src={item.userData.image}
                                        alt=''
                                        className='w-10 h-10 rounded-xl object-cover border-2 border-blue-100 flex-shrink-0'
                                    />
                                    <p className='font-semibold text-gray-700 text-sm'>{item.userData.name}</p>
                                </div>

                                {/* Payment */}
                                <div>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-semibold ${
                                        item.payment
                                            ? 'bg-green-50 text-green-600 border border-green-200'
                                            : 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${item.payment ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                        {item.payment ? 'Online' : 'Cash'}
                                    </span>
                                </div>

                                {/* Age */}
                                <p className='text-sm text-gray-500 max-sm:hidden'>{calculateAge(item.userData.dob)} yrs</p>

                                {/* Date & Time */}
                                <div className='flex items-center gap-1.5'>
                                    <svg className='w-3.5 h-3.5 text-blue-400 flex-shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                    </svg>
                                    <p className='text-sm text-gray-600'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                                </div>

                                {/* Fees */}
                                <p className='font-bold text-gray-700 text-sm'>{currency}{item.amount}</p>

                                {/* Actions */}
                                {item.cancelled ? (
                                    <span className='inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-50 border border-red-200 rounded-full'>
                                        <svg className='w-3 h-3' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                                        </svg>
                                        Cancelled
                                    </span>
                                ) : item.isCompleted ? (
                                    <span className='inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 rounded-full'>
                                        <svg className='w-3 h-3' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                                        </svg>
                                        Completed
                                    </span>
                                ) : (
                                    <div className='flex items-center gap-2'>
                                        <button
                                            onClick={() => cancelAppointment(item._id)}
                                            className='w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 border border-red-100 hover:bg-red-500 hover:border-red-500 group transition-all duration-200'
                                        >
                                            <img src={assets.cancel_icon} alt='Cancel' className='w-4 group-hover:brightness-0 group-hover:invert transition-all duration-200' />
                                        </button>
                                        <button
                                            onClick={() => completeAppointment(item._id)}
                                            className='w-8 h-8 flex items-center justify-center rounded-xl bg-green-50 border border-green-100 hover:bg-green-500 hover:border-green-500 group transition-all duration-200'
                                        >
                                            <img src={assets.tick_icon} alt='Complete' className='w-4 group-hover:brightness-0 group-hover:invert transition-all duration-200' />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DoctorAppointment