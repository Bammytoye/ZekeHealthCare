import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
    const [role, setRole] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { setAToken, aToken, backendUrl } = useContext(AdminContext)
    const { setDToken, dToken } = useContext(DoctorContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (aToken) navigate('/admin_dashboard')
        else if (dToken) navigate('/doctor_dashboard')
    }, [aToken, dToken, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (role === 'Admin') {
                const { data } = await axios.post(`${backendUrl}/admin/login`, { email, password })
                if (data.token) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                    toast.success('Admin login successful')
                    navigate('/admin_dashboard')
                } else {
                    toast.error(data.message || 'Login failed. Check your credentials')
                }
            } else {
                const { data } = await axios.post(`${backendUrl}/doctors/login`, { email, password })
                if (data.token) {
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token)
                    toast.success('Doctor login successful')
                    navigate('/doctor_dashboard')
                } else {
                    toast.error(data.message || 'Login failed. Check your credentials')
                }
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Login failed. Check credentials'
            toast.error(msg)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4'
        >
            {/* Decorative blobs */}
            <div className='fixed -top-20 -left-20 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl pointer-events-none'></div>
            <div className='fixed -bottom-20 -right-20 w-72 h-72 bg-cyan-200 opacity-20 rounded-full blur-3xl pointer-events-none'></div>

            <div className='relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden'>

                {/* Top gradient bar */}
                <div className='h-1.5 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400'></div>

                <div className='px-8 sm:px-10 py-10 flex flex-col gap-5'>

                    {/* Role Icon */}
                    <div className='flex justify-center'>
                        <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-200'>
                            {role === 'Admin'
                                ? <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                                </svg>
                                : <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                </svg>
                            }
                        </div>
                    </div>

                    {/* Title */}
                    <div className='text-center -mt-1'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400'>{role}</span> Login
                        </h2>
                        <p className='text-sm text-gray-400 mt-1'>Welcome back, please sign in to continue</p>
                    </div>

                    {/* Role Toggle Pills */}
                    <div className='flex bg-gray-100 rounded-2xl p-1 gap-1'>
                        {['Admin', 'Doctor'].map(r => (
                            <button
                                key={r}
                                type='button'
                                onClick={() => setRole(r)}
                                className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                                    role === r
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md'
                                        : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className='w-full h-px bg-gradient-to-r from-blue-100 via-cyan-100 to-transparent -mt-1'></div>

                    {/* Email */}
                    <div className='w-full'>
                        <label className='text-xs font-bold text-gray-500 uppercase tracking-wide'>Email</label>
                        <div className='relative mt-1.5'>
                            <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                                <svg className='w-4 h-4 text-gray-300' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                </svg>
                            </div>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type='email'
                                placeholder='Enter your email'
                                className='w-full pl-10 pr-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200'
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className='w-full'>
                        <label className='text-xs font-bold text-gray-500 uppercase tracking-wide'>Password</label>
                        <div className='relative mt-1.5'>
                            <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                                <svg className='w-4 h-4 text-gray-300' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                                </svg>
                            </div>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter your password'
                                className='w-full pl-10 pr-11 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200'
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(prev => !prev)}
                                className='absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200'
                            >
                                {showPassword
                                    ? <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' />
                                    </svg>
                                    : <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                    </svg>
                                }
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type='submit'
                        className='w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold py-3 rounded-xl shadow-md shadow-blue-200 hover:scale-105 hover:shadow-lg transition-all duration-300 group mt-1'
                    >
                        Sign In
                        <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M17 8l4 4m0 0l-4 4m4-4H3' />
                        </svg>
                    </button>

                    {/* Role switcher */}
                    <p className='text-center text-sm text-gray-400'>
                        {role === 'Admin' ? 'Are you a doctor?' : 'Are you an admin?'}{' '}
                        <span
                            className='text-blue-500 font-semibold cursor-pointer hover:text-cyan-500 transition-colors duration-200'
                            onClick={() => setRole(role === 'Admin' ? 'Doctor' : 'Admin')}
                        >
                            Sign in here
                        </span>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default Login