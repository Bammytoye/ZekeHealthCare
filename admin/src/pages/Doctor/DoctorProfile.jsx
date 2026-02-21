import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {
    const { dToken, getProfileData, profileData, setProfileData, updateProfile } = useContext(DoctorContext)
    const { currency } = useContext(AppContext)

    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    const handleAvailability = () => {
        if (isEdit) {
            setProfileData(prev => ({ ...prev, available: !prev.available }))
        }
    }

    const handleSave = async () => {
        try {
            const updatedData = {
                fees: profileData.fees,
                about: profileData.about,
                address: profileData.address,
                available: profileData.available
            }
            await updateProfile(updatedData)
            setIsEdit(false)
        } catch (error) {
            console.error(error)
        }
    }

    return profileData && (
        <div className='m-5 max-w-4xl'>

            {/* Header */}
            <div className='mb-6'>
                <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-blue-100'>
                    Doctor Profile
                </span>
                <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                    My <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400'>Profile</span>
                </h2>
                <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-3'></div>
            </div>

            <div className='bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden'>

                {/* Top gradient banner */}
                <div className='relative h-24 sm:h-32 bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400'>
                    <div className='absolute -top-6 -right-6 w-32 h-32 bg-white opacity-5 rounded-full'></div>
                    <div className='absolute bottom-0 left-1/3 w-20 h-20 bg-cyan-300 opacity-10 rounded-full'></div>
                </div>

                <div className='px-6 sm:px-8 pb-8'>
                    <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14 sm:-mt-16 mb-6'>

                        {/* Avatar */}
                        <div className='relative'>
                            <img
                                src={profileData.image}
                                alt={profileData.name}
                                className='w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-lg'
                            />
                            {/* Availability dot */}
                            <span className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${profileData.available ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                        </div>

                        {/* Edit / Save button */}
                        <div className='sm:mb-2'>
                            {isEdit ? (
                                <button
                                    onClick={handleSave}
                                    className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300'
                                >
                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                                    </svg>
                                    Save Changes
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsEdit(true)}
                                    className='flex items-center gap-2 border-2 border-blue-400 text-blue-500 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300'
                                >
                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                                    </svg>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Name + Degree */}
                    <div className='mb-2'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>{profileData.name}</h2>
                        <div className='flex flex-wrap items-center gap-2 mt-2'>
                            <span className='text-sm text-gray-500'>{profileData.degree} · {profileData.speciality}</span>
                            <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100'>
                                {profileData.experience} experience
                            </span>
                        </div>
                    </div>

                    <div className='w-full h-px bg-gradient-to-r from-blue-100 via-cyan-100 to-transparent my-5'></div>

                    {/* Info Grid */}
                    <div className='flex flex-col gap-4'>

                        {/* About */}
                        <div className='bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100'>
                            <div className='flex items-center gap-2 mb-2'>
                                <div className='w-1 h-4 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full'></div>
                                <p className='text-xs font-bold text-gray-500 uppercase tracking-widest'>About</p>
                            </div>
                            {isEdit ? (
                                <textarea
                                    value={profileData.about}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                                    className='w-full bg-white border border-blue-200 text-gray-700 text-sm px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none'
                                    rows='4'
                                />
                            ) : (
                                <p className='text-gray-600 text-sm leading-7'>{profileData.about}</p>
                            )}
                        </div>

                        {/* Fees + Address Row */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

                            {/* Fees */}
                            <div className='flex items-center gap-4 bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100'>
                                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow'>
                                    <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' />
                                    </svg>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-xs text-gray-400 font-medium uppercase tracking-wide'>Appointment Fee</p>
                                    {isEdit ? (
                                        <input
                                            type='number'
                                            value={profileData.fees}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                            className='bg-white border border-blue-200 text-gray-700 text-sm font-bold px-2 py-1 rounded-lg w-full mt-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300'
                                        />
                                    ) : (
                                        <p className='text-blue-600 font-bold text-lg'>{currency}{profileData.fees}</p>
                                    )}
                                </div>
                            </div>

                            {/* Availability Toggle */}
                            <div className='flex items-center gap-4 bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100'>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow ${profileData.available ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gray-200'}`}>
                                    <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                    </svg>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-xs text-gray-400 font-medium uppercase tracking-wide'>Availability</p>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <input
                                            type='checkbox'
                                            checked={profileData.available}
                                            onChange={handleAvailability}
                                            className='w-4 h-4 accent-blue-500 cursor-pointer'
                                        />
                                        <span className={`text-sm font-semibold ${profileData.available ? 'text-green-600' : 'text-gray-400'}`}>
                                            {profileData.available ? 'Available' : 'Not Available'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className='flex items-start gap-4 bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100'>
                            <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow mt-0.5'>
                                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                </svg>
                            </div>
                            <div className='flex-1'>
                                <p className='text-xs text-gray-400 font-medium uppercase tracking-wide mb-2'>Address</p>
                                {isEdit ? (
                                    <div className='flex flex-col gap-2'>
                                        <input
                                            type='text'
                                            value={profileData.address.line1}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                            className='bg-white border border-blue-200 text-gray-700 text-sm px-3 py-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-300'
                                            placeholder='Address line 1'
                                        />
                                        <input
                                            type='text'
                                            value={profileData.address.line2}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                            className='bg-white border border-blue-200 text-gray-700 text-sm px-3 py-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-300'
                                            placeholder='Address line 2'
                                        />
                                    </div>
                                ) : (
                                    <p className='text-gray-600 text-sm leading-6'>
                                        {profileData.address.line1}<br />{profileData.address.line2}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile