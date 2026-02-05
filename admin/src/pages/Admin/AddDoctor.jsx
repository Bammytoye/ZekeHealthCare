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

        // Basic front-end validation
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
            formData.append(
                'address',
                JSON.stringify({ line1: address1, line2: address2 })
            )

            const { data } = await axios.post(
                `${backendUrl}/admin/add-doctor`,
                formData,
                {
                    headers: {
                        aToken
                    },
                }
            )

            if (data.success) {
                toast.success(data.message)
                // Reset form
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
            toast.error(
                error.response?.data?.message || 'Failed to add doctor. Try again.'
            )
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full">
            <p className="mb-4 text-xl font-semibold text-gray-700">Add Doctor</p>

            <div className="bg-white px-8 py-8 border rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-scroll shadow-sm">

                {/* Upload Image */}
                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="doc-img">
                        <img
                            className="w-20 h-20 bg-gray-100 rounded-full cursor-pointer object-cover border"
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                            alt="Upload"
                        />
                    </label>
                    <input
                        onChange={(e) => setDocImg(e.target.files[0])}
                        type="file"
                        id="doc-img"
                        hidden
                    />
                    <p className="text-sm">
                        Upload doctor <br /> picture
                    </p>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Doctor Name</p>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">Doctor Email</p>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">Password</p>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">Experience</p>
                            <select
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i}>{i + 1} Year</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">Fees</p>
                            <input
                                type="number"
                                placeholder="Fees"
                                value={fees}
                                onChange={(e) => setFees(e.target.value)}
                                required
                                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Specialization</p>
                            <select
                                value={speciality}
                                onChange={(e) => setSpeciality(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option>General Physician</option>
                                <option>Gynecologist</option>
                                <option>Dermatologist</option>
                                <option>Pediatrician</option>
                                <option>Neurologist</option>
                                <option>Gastroenterologist</option>
                            </select>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">Education</p>
                            <input
                                type="text"
                                placeholder="Education"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                                required
                                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">Address</p>
                            <input
                                type="text"
                                placeholder="Address 1"
                                value={address1}
                                onChange={(e) => setAddress1(e.target.value)}
                                required
                                className="w-full border rounded-md px-3 py-2 mt-1 mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                                type="text"
                                placeholder="Address 2"
                                value={address2}
                                onChange={(e) => setAddress2(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* About */}
                <div className="mt-6">
                    <p className="text-sm text-gray-600">About Doctor</p>
                    <textarea
                        placeholder="About Doctor"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        rows={5}
                        required
                        className="w-full border rounded-md px-3 py-2 mt-1 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-6 bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition-all duration-200"
                >
                    Add Doctor
                </button>
            </div>
        </form>
    )
}

export default AddDoctor
