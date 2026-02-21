import React, { useState } from 'react'
import assets from '../assets/assets_frontend/assets'
import { useContext } from 'react'
import { AppContent } from '../context/AppContent'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
    const { userData, setUserData, token, backendURL, loadUserProfile } = useContext(AppContent)
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(`${backendURL}/user/update-profile`, formData, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                await loadUserProfile()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return userData && (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 sm:px-6 md:px-10 py-10'>
            <div className='max-w-2xl mx-auto'>

                {/* Profile Card */}
                <div className='bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100'>

                    {/* Header Banner */}
                    <div className='relative h-28 sm:h-36 bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400'>
                        <div className='absolute -top-6 -right-6 w-32 h-32 bg-white opacity-5 rounded-full'></div>
                        <div className='absolute bottom-0 left-1/3 w-20 h-20 bg-cyan-300 opacity-10 rounded-full'></div>
                        <p className='absolute top-5 left-6 text-white text-xs font-semibold tracking-widest uppercase opacity-80'>My Profile</p>
                    </div>

                    {/* Avatar + Name */}
                    <div className='px-6 sm:px-8 pb-6'>
                        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14 sm:-mt-16 mb-6'>

                            {/* Avatar */}
                            <div className='relative'>
                                {isEdit
                                    ? <label htmlFor='image'>
                                        <div className='inline-block relative cursor-pointer group'>
                                            <img
                                                className='w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-lg opacity-80 group-hover:opacity-60 transition-opacity duration-300'
                                                src={image ? URL.createObjectURL(image) : userData.image}
                                                alt=""
                                            />
                                            <div className='absolute inset-0 flex items-center justify-center rounded-2xl bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300'>
                                                <img className='w-7' src={image ? null : assets.upload_icon} alt="" />
                                            </div>
                                        </div>
                                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
                                    </label>
                                    : <img
                                        className='w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-lg'
                                        src={userData.image}
                                        alt={userData.name}
                                    />
                                }
                                {/* Online dot */}
                                <span className='absolute bottom-2 right-2 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full'></span>
                            </div>

                            {/* Name + Edit button row */}
                            <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 sm:mb-2'>
                                {isEdit
                                    ? <input
                                        className='bg-blue-50 border border-blue-200 text-2xl sm:text-3xl font-bold text-gray-800 px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 max-w-xs'
                                        type='text'
                                        value={userData.name}
                                        onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                    />
                                    : <p className='font-bold text-2xl sm:text-3xl text-gray-800'>{userData.name}</p>
                                }

                                {isEdit
                                    ? <button
                                        className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300'
                                        onClick={updateUserProfileData}>
                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                                        </svg>
                                        Save
                                    </button>
                                    : <button
                                        className='flex items-center gap-2 border-2 border-blue-400 text-blue-500 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300'
                                        onClick={() => setIsEdit(true)}>
                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                                        </svg>
                                        Edit Profile
                                    </button>
                                }
                            </div>
                        </div>

                        <div className='w-full h-px bg-gradient-to-r from-blue-100 via-cyan-100 to-transparent mb-6'></div>

                        {/* Contact Information */}
                        <div className='mb-6'>
                            <div className='flex items-center gap-2 mb-4'>
                                <div className='w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full'></div>
                                <p className='text-gray-800 font-bold text-sm uppercase tracking-widest'>Contact Information</p>
                            </div>

                            <div className='flex flex-col gap-3'>
                                {/* Email */}
                                <div className='flex items-center gap-4 bg-blue-50 rounded-2xl px-5 py-3.5 border border-blue-100'>
                                    <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow'>
                                        <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className='text-xs text-gray-400 font-medium uppercase tracking-wide'>Email</p>
                                        <p className='text-blue-500 font-medium text-sm break-all'>{userData.email}</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className='flex items-center gap-4 bg-gray-50 rounded-2xl px-5 py-3.5 border border-gray-100'>
                                    <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow'>
                                        <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                                        </svg>
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-xs text-gray-400 font-medium uppercase tracking-wide'>Phone</p>
                                        {isEdit
                                            ? <input
                                                className='bg-white border border-blue-200 text-gray-700 text-sm px-2 py-1 rounded-lg w-full max-w-52 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-0.5'
                                                type='text'
                                                value={userData.phone}
                                                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                            />
                                            : <p className='text-blue-400 font-medium text-sm'>{userData.phone}</p>
                                        }
                                    </div>
                                </div>

                                {/* Address */}
                                <div className='flex items-start gap-4 bg-gray-50 rounded-2xl px-5 py-3.5 border border-gray-100'>
                                    <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow mt-0.5'>
                                        <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                        </svg>
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-xs text-gray-400 font-medium uppercase tracking-wide mb-1'>Address</p>
                                        {isEdit
                                            ? <div className='flex flex-col gap-2'>
                                                <input
                                                    className='bg-white border border-blue-200 text-gray-700 text-sm px-2 py-1 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300'
                                                    value={userData.address?.line1 || ''}
                                                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                                    type="text"
                                                    placeholder='Address line 1'
                                                />
                                                <input
                                                    className='bg-white border border-blue-200 text-gray-700 text-sm px-2 py-1 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300'
                                                    value={userData.address?.line2 || ''}
                                                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                                    type="text"
                                                    placeholder='Address line 2'
                                                />
                                            </div>
                                            : <p className='text-gray-500 text-sm leading-6'>
                                                {userData.address?.line1}<br />{userData.address?.line2}
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full h-px bg-gradient-to-r from-blue-100 via-cyan-100 to-transparent mb-6'></div>

                        {/* Basic Information */}
                        <div>
                            <div className='flex items-center gap-2 mb-4'>
                                <div className='w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full'></div>
                                <p className='text-gray-800 font-bold text-sm uppercase tracking-widest'>Basic Information</p>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                {/* Gender */}
                                <div className='flex items-center gap-4 bg-gray-50 rounded-2xl px-5 py-3.5 border border-gray-100'>
                                    <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow'>
                                        <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                        </svg>
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-xs text-gray-400 font-medium uppercase tracking-wide'>Gender</p>
                                        {isEdit
                                            ? <select
                                                className='bg-white border border-blue-200 text-gray-700 text-sm px-2 py-1 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300 mt-0.5'
                                                value={userData.gender}
                                                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            : <p className='text-gray-500 font-medium text-sm'>{userData.gender}</p>
                                        }
                                    </div>
                                </div>

                                {/* Birthday */}
                                <div className='flex items-center gap-4 bg-gray-50 rounded-2xl px-5 py-3.5 border border-gray-100'>
                                    <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow'>
                                        <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                        </svg>
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-xs text-gray-400 font-medium uppercase tracking-wide'>Birthday</p>
                                        {isEdit
                                            ? <input
                                                className='bg-white border border-blue-200 text-gray-700 text-sm px-2 py-1 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300 mt-0.5'
                                                type="date"
                                                value={userData.dob}
                                                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                            />
                                            : <p className='text-gray-500 font-medium text-sm'>{userData.dob}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile