import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'

const AddDoctor = () => {
    const { backendUrl, aToken } = useContext(AdminContext)

    const [docImg, setDocImg] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General Physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (!docImg) return toast.error('Please select a doctor image!')
        if (!name || !email || !password || !fees || !about || !degree || !address1)
            return toast.error('Please fill all required fields!')

        try {
            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('degree', degree)
            formData.append('speciality', speciality)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(
                `${backendUrl}/admin/add-doctor`,
                formData,
                { headers: { aToken } }
            )

            if (data.success) {
                toast.success(data.message)
                setDocImg(null)
                setName('')
                setEmail('')
                setPassword('')
                setExperience('1 Year')
                setFees('')
                setAbout('')
                setDegree('')
                setSpeciality('General Physician')
                setAddress1('')
                setAddress2('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Add Doctor Error:', error.response || error.message)
            toast.error(error.response?.data?.message || 'Failed to add doctor. Try again.')
        }
    }

    const inputClass = 'w-full bg-gray-50 border border-gray-100 text-gray-700 text-sm px-4 py-2.5 rounded-xl mt-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 placeholder:text-gray-300'
    const labelClass = 'text-xs font-bold text-gray-500 uppercase tracking-wide'

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>

            {/* Page Header */}
            <div className='mb-6'>
                <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-blue-100'>
                    Management
                </span>
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                    Add <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400'>Doctor</span>
                </h1>
                <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-3'></div>
            </div>

            <div className='bg-white rounded-3xl border border-gray-100 shadow-sm w-full max-w-4xl overflow-hidden'>

                {/* Top gradient bar */}
                <div className='h-1.5 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400'></div>

                <div className='px-6 sm:px-8 py-8 max-h-[80vh] overflow-y-auto'>

                    {/* Image Upload */}
                    <div className='flex items-center gap-5 mb-8'>
                        <label htmlFor='doc-img' className='cursor-pointer group'>
                            <div className='relative w-20 h-20'>
                                <img
                                    className='w-20 h-20 rounded-2xl object-cover border-2 border-blue-100 bg-blue-50 group-hover:border-blue-300 transition-all duration-300'
                                    src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                                    alt='Upload'
                                />
                                <div className='absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-md'>
                                    <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
                                    </svg>
                                </div>
                            </div>
                        </label>
                        <input onChange={(e) => setDocImg(e.target.files[0])} type='file' id='doc-img' hidden />
                        <div>
                            <p className='font-semibold text-gray-700 text-sm'>Doctor Photo</p>
                            <p className='text-xs text-gray-400 mt-0.5'>Click to upload a profile picture</p>
                            {docImg && <p className='text-xs text-green-500 font-medium mt-1'>✓ Image selected</p>}
                        </div>
                    </div>

                    <div className='w-full h-px bg-gradient-to-r from-blue-100 via-cyan-100 to-transparent mb-7'></div>

                    {/* Form Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5'>

                        {/* Left Column */}
                        <div className='flex flex-col gap-5'>

                            <div>
                                <label className={labelClass}>Doctor Name</label>
                                <input type='text' placeholder='Full name' value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
                            </div>

                            <div>
                                <label className={labelClass}>Email Address</label>
                                <input type='email' placeholder='doctor@example.com' value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
                            </div>

                            <div>
                                <label className={labelClass}>Password</label>
                                <input type='password' placeholder='Set a password' value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} />
                            </div>

                            <div>
                                <label className={labelClass}>Experience</label>
                                <select value={experience} onChange={(e) => setExperience(e.target.value)} className={inputClass}>
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <option key={i}>{i + 1} Year</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Consultation Fees</label>
                                <input type='number' placeholder='e.g. 5000' value={fees} onChange={(e) => setFees(e.target.value)} required className={inputClass} />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className='flex flex-col gap-5'>

                            <div>
                                <label className={labelClass}>Specialization</label>
                                <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className={inputClass}>
                                    <option>General Physician</option>
                                    <option>Gynecologist</option>
                                    <option>Dermatologist</option>
                                    <option>Pediatrician</option>
                                    <option>Neurologist</option>
                                    <option>Gastroenterologist</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Education / Degree</label>
                                <input type='text' placeholder='e.g. MBBS, MD' value={degree} onChange={(e) => setDegree(e.target.value)} required className={inputClass} />
                            </div>

                            <div>
                                <label className={labelClass}>Address</label>
                                <input type='text' placeholder='Address line 1' value={address1} onChange={(e) => setAddress1(e.target.value)} required className={inputClass} />
                                <input type='text' placeholder='Address line 2 (optional)' value={address2} onChange={(e) => setAddress2(e.target.value)} className={`${inputClass} mt-2`} />
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    <div className='mt-6'>
                        <label className={labelClass}>About Doctor</label>
                        <textarea
                            placeholder='Brief bio, qualifications, and expertise...'
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            rows={4}
                            required
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    <div className='w-full h-px bg-gradient-to-r from-blue-100 via-cyan-100 to-transparent mt-7 mb-6'></div>

                    {/* Submit */}
                    <button
                        type='submit'
                        className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold px-8 py-3 rounded-full shadow-md shadow-blue-200 hover:scale-105 hover:shadow-lg transition-all duration-300 group'
                    >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
                        </svg>
                        Add Doctor
                        <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M17 8l4 4m0 0l-4 4m4-4H3' />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddDoctor