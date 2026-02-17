import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContent } from '../context/AppContent'

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { backendURL } = useContext(AppContent)
    const [verifying, setVerifying] = useState(true)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const verifyPayment = async () => {
            const reference = searchParams.get('reference')
            const appointmentId = searchParams.get('appointmentId')
            
            if (!reference) {
                toast.error('Invalid payment reference')
                navigate('/my-appointment')
                return
            }

            try {
                const { data } = await axios.post(
                    `${backendURL}/user/verify-payment`,
                    { reference, appointmentId },
                    { headers: { token: localStorage.getItem('token') } }
                )

                if (data.success) {
                    setSuccess(true)
                    toast.success('Payment successful!')
                    setTimeout(() => navigate('/my-appointment'), 3000)
                } else {
                    toast.error('Payment verification failed')
                    setTimeout(() => navigate('/my-appointment'), 3000)
                }
            } catch (error) {
                toast.error('Payment verification failed')
                setTimeout(() => navigate('/my-appointment'), 3000)
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
                    </>
                ) : success ? (
                    <>
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                        <p>Redirecting...</p>
                    </>
                ) : (
                    <>
                        <div className="text-6xl mb-4">❌</div>
                        <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
                    </>
                )}
            </div>
        </div>
    )
}

export default PaymentSuccess