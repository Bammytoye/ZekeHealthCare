import React, { useContext, useEffect, useState } from 'react'
import { AppContent } from '../context/AppContent'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [state, setState] = useState('Sign Up')
    const { token, setToken, backendURL } = useContext(AppContent)
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (state === 'Sign Up') {
                const { data } = await axios.post(`${backendURL}/user/register`, { name, password, email })
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(`${backendURL}/user/login`, { password, email })
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) navigate('/')
    }, [token])

    const isLogin = state === 'Login'

    return (
        <div className='min-h-[85vh] bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-10'>
            <div className='w-full max-w-md'>

                {/* Card */}
                <div className='bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden'>

                    {/* Top gradient bar */}
                    <div className='h-2 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400'></div>

                    <div className='px-8 py-10'>

                        {/* Header */}
                        <div className='text-center mb-8'>
                            <div className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-200 mb-4'>
                                <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                    {isLogin
                                        ? <path strokeLinecap='round' strokeLinejoin='round' d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                                        : <path strokeLinecap='round' strokeLinejoin='round' d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                                    }
                                </svg>
                            </div>
                            <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className='text-gray-400 text-sm mt-1'>
                                {isLogin ? 'Login to manage your appointments' : 'Sign up to book your first appointment'}
                            </p>
                        </div>

                        {/* Toggle tabs */}
                        <div className='flex bg-gray-100 rounded-2xl p-1 mb-7'>
                            {['Sign Up', 'Login'].map((tab) => (
                                <button
                                    key={tab}
                                    type='button'
                                    onClick={() => setState(tab)}
                                    className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${state === tab
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md'
                                        : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                            {/* Full Name */}
                            {state === 'Sign Up' && (
                                <div>
                                    <label className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block'>Full Name</label>
                                    <div className='relative'>
                                        <div className='absolute left-3.5 top-1/2 -translate-y-1/2'>
                                            <svg className='w-4 h-4 text-blue-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                            </svg>
                                        </div>
                                        <input
                                            className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent focus:bg-white transition-all duration-200'
                                            type='text'
                                            placeholder='John Doe'
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block'>Email Address</label>
                                <div className='relative'>
                                    <div className='absolute left-3.5 top-1/2 -translate-y-1/2'>
                                        <svg className='w-4 h-4 text-blue-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                        </svg>
                                    </div>
                                    <input
                                        className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent focus:bg-white transition-all duration-200'
                                        type='email'
                                        placeholder='you@example.com'
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block'>Password</label>
                                <div className='relative'>
                                    <div className='absolute left-3.5 top-1/2 -translate-y-1/2'>
                                        <svg className='w-4 h-4 text-blue-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                                        </svg>
                                    </div>
                                    <input
                                        className='w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent focus:bg-white transition-all duration-200'
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='••••••••'
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        required
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(p => !p)}
                                        className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors duration-200'
                                    >
                                        {showPassword
                                            ? <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' /></svg>
                                            : <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' /><path strokeLinecap='round' strokeLinejoin='round' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' /></svg>
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type='submit'
                                className='w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-200 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 mt-2 group'
                            >
                                {isLogin ? 'Login to Account' : 'Create Account'}
                                <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                </svg>
                            </button>
                        </form>

                        {/* Footer switch */}
                        <p className='text-center text-sm text-gray-400 mt-6'>
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                            <span
                                onClick={() => setState(isLogin ? 'Sign Up' : 'Login')}
                                className='text-blue-500 font-semibold cursor-pointer hover:text-cyan-500 transition-colors duration-200'
                            >
                                {isLogin ? 'Sign Up' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Bottom trust note */}
                <p className='text-center text-xs text-gray-300 mt-5'>
                    Secured by <span className='font-semibold text-gray-400'>ZekeTech</span> · Your data is safe with us
                </p>
            </div>
        </div>
    )
}

export default Login