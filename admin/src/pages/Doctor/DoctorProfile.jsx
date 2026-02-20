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

    // Toggle availability
    const handleAvailability = () => {
        if (isEdit) {
            setProfileData(prev => ({ ...prev, available: !prev.available }))
        }
    }

    // Handle Save
    const handleSave = async () => {
        try {
            // Only send editable fields: fees, about, address, available
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
        <div className="m-5 max-w-5xl">
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row gap-10">

                {/* Profile Image */}
                <div className="flex justify-center">
                    <img
                        src={profileData.image}
                        alt=""
                        className="w-48 h-48 rounded-2xl object-cover border shadow"
                    />
                </div>

                {/* Profile Details */}
                <div className="flex-1 space-y-5">

                    {/* Name (non-editable now) */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {profileData.name}
                        </h2>
                    </div>

                    {/* Degree & Speciality */}
                    <div className="flex items-center gap-3">
                        <p className="text-gray-600">
                            {profileData.degree} - {profileData.speciality}
                        </p>
                        <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                            {profileData.experience} experience
                        </span>
                    </div>

                    {/* About */}
                    <div>
                        <p className="font-semibold text-gray-700 mb-1">About</p>
                        {isEdit ? (
                            <textarea
                                value={profileData.about}
                                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                                className="border p-2 rounded w-full"
                                rows="4"
                            />
                        ) : (
                            <p className="text-gray-600">{profileData.about}</p>
                        )}
                    </div>

                    {/* Fees */}
                    <div>
                        <p className="font-semibold text-gray-700">
                            Appointment Fee:
                            {isEdit ? (
                                <input
                                    type="number"
                                    value={profileData.fees}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                    className="border p-1 rounded ml-2 w-24"
                                />
                            ) : (
                                <span className="text-green-600 ml-2">{currency}{profileData.fees}</span>
                            )}
                        </p>
                    </div>

                    {/* Address */}
                    <div>
                        <p className="font-semibold text-gray-700">Address</p>
                        {isEdit ? (
                            <>
                                <input
                                    type="text"
                                    value={profileData.address.line1}
                                    onChange={(e) => setProfileData(prev => ({
                                        ...prev,
                                        address: { ...prev.address, line1: e.target.value }
                                    }))}
                                    className="border p-2 rounded w-full mb-2"
                                />
                                <input
                                    type="text"
                                    value={profileData.address.line2}
                                    onChange={(e) => setProfileData(prev => ({
                                        ...prev,
                                        address: { ...prev.address, line2: e.target.value }
                                    }))}
                                    className="border p-2 rounded w-full"
                                />
                            </>
                        ) : (
                            <p className="text-gray-600">
                                {profileData.address.line1} <br />
                                {profileData.address.line2}
                            </p>
                        )}
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={profileData.available}
                            onChange={handleAvailability}
                            className="w-5 h-5"
                        />
                        <label className="text-gray-700 font-medium">Available</label>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        {isEdit ? (
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEdit(true)}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DoctorProfile