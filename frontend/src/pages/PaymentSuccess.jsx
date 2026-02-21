import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContent } from '../context/AppContent'

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { backendURL, getDoctorsData } = useContext(AppContent)
    const [verifying, setVerifying] = useState(true)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const verifyPayment = async () => {
            const reference = searchParams.get('reference')

            if (!reference) {
                toast.error('Payment reference missing')
                return navigate('/my-appointment')
            }

            try {
                const { data } = await axios.post(
                    `${backendURL}/user/verify-payment`,
                    { reference, appointmentId: reference },
                    { headers: { token: localStorage.getItem('token') } }
                )

                if (data.success) {
                    toast.success('Payment successful!')
                    setSuccess(true)
                    setTimeout(() => {
                        navigate('/my-appointment')
                    }, 2000)
                } else {
                    toast.error(data.message || 'Verification failed')
                    navigate('/my-appointment')
                }

            } catch (error) {
                toast.error('Verification failed')
                console.error(error)
                navigate('/my-appointment')
            } finally {
                setVerifying(false)
            }
        }

        verifyPayment()
    }, [])

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4'>
            <div className='w-full max-w-md'>

                {/* Card */}
                <div className='bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden'>

                    {/* Top gradient banner */}
                    <div className='h-2 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400'></div>

                    <div className='px-8 py-12 text-center'>

                        {verifying && (
                            <>
                                {/* Spinner */}
                                <div className='relative w-20 h-20 mx-auto mb-7'>
                                    <div className='absolute inset-0 rounded-full border-4 border-blue-100'></div>
                                    <div className='absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin'></div>
                                    <div className='absolute inset-3 rounded-full bg-blue-50 flex items-center justify-center'>
                                        <svg className='w-6 h-6 text-blue-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className='text-2xl font-bold text-gray-800 mb-2'>Verifying Payment</h2>
                                <p className='text-gray-400 text-sm leading-6'>Please wait and do not close this page.<br />This will only take a moment.</p>

                                {/* Progress dots */}
                                <div className='flex items-center justify-center gap-1.5 mt-6'>
                                    {[0, 1, 2].map(i => (
                                        <div
                                            key={i}
                                            className='w-2 h-2 rounded-full bg-blue-400 animate-bounce'
                                            style={{ animationDelay: `${i * 0.15}s` }}
                                        ></div>
                                    ))}
                                </div>
                            </>
                        )}

                        {!verifying && success && (
                            <>
                                {/* Success icon */}
                                <div className='relative w-24 h-24 mx-auto mb-7'>
                                    <div className='absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30'></div>
                                    <div className='relative w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-200'>
                                        <svg className='w-12 h-12 text-white' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                                        </svg>
                                    </div>
                                </div>

                                <span className='inline-block bg-green-50 text-green-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-green-100 mb-4'>
                                    Transaction Complete
                                </span>
                                <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>Payment Successful!</h2>
                                <p className='text-gray-400 text-sm leading-6'>
                                    Your appointment has been confirmed.<br />Redirecting you to your appointments...
                                </p>

                                {/* Redirect bar */}
                                <div className='mt-8 bg-gray-100 rounded-full h-1.5 overflow-hidden'>
                                    <div className='h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-[grow_2s_ease-in-out_forwards]'
                                        style={{ animation: 'width 2s linear forwards', width: '0%' }}>
                                    </div>
                                </div>
                                <p className='text-xs text-gray-300 mt-2'>Redirecting in 2 seconds...</p>
                            </>
                        )}

                        {!verifying && !success && (
                            <>
                                {/* Failed icon */}
                                <div className='relative w-24 h-24 mx-auto mb-7'>
                                    <div className='absolute inset-0 rounded-full bg-red-100 animate-ping opacity-30'></div>
                                    <div className='relative w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-lg shadow-red-200'>
                                        <svg className='w-12 h-12 text-white' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                                        </svg>
                                    </div>
                                </div>

                                <span className='inline-block bg-red-50 text-red-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-red-100 mb-4'>
                                    Transaction Failed
                                </span>
                                <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>Verification Failed</h2>
                                <p className='text-gray-400 text-sm leading-6'>
                                    We couldn't verify your payment.<br />Redirecting you back to your appointments...
                                </p>
                                <p className='text-xs text-gray-300 mt-6'>Redirecting shortly...</p>
                            </>
                        )}

                    </div>
                </div>

                {/* Bottom label */}
                <p className='text-center text-xs text-gray-300 mt-5'>
                    Secured by <span className='font-semibold text-gray-400'>ZekeTech</span> · Powered by Paystack
                </p>

            </div>
        </div>
    )
}

export default PaymentSuccess