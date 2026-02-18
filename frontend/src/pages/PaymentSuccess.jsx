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
                    { reference, appointmentId: reference }, // 🔥 FIX HERE
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
                navigate('/my-appointment')
            } finally {
                setVerifying(false)
            }
        }

        verifyPayment()
    }, [])



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                {verifying ? (
                    <>
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold mb-2">Verifying Payment...</h2>
                        <p className="text-gray-500 text-sm">Please wait, do not close this page.</p>
                    </>
                ) : success ? (
                    <>
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className="text-2xl font-bold text-green-700 mb-2">
                            Payment Successful!
                        </h2>
                        <p className="text-gray-500">
                            Redirecting to your appointments...
                        </p>
                    </>
                ) : (
                    <>
                        <div className="text-6xl mb-4">❌</div>
                        <h2 className="text-2xl font-bold text-red-700 mb-2">
                            Verification Failed
                        </h2>
                        <p className="text-gray-500">
                            Redirecting to your appointments...
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default PaymentSuccess