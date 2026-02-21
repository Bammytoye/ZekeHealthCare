import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContent } from '../context/AppContent'
import assets from '../assets/assets_frontend/assets'
import RelatedDoctor from '../components/RelatedDoctor'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
    const { docId } = useParams()
    const { doctorsData, currencySymbol, backendURL, token, getDoctorsData } = useContext(AppContent)
    const navigate = useNavigate()

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(null)
    const [docSlot, setDocSlot] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    useEffect(() => {
        if (!doctorsData.length) return
        const doctor = doctorsData.find(doc => doc._id.toString() === docId)
        setDocInfo(doctor)
    }, [doctorsData, docId])

    const getAvailableSlots = () => {
        let slots = []
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date(currentDate)
            endTime.setHours(21, 0, 0, 0)

            if (today.toDateString() === currentDate.toDateString()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10, 0, 0, 0)
            }

            let timeSlots = []
            while (currentDate < endTime) {
                const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()
                const slotDate = day + "/" + month + "/" + year

                const isSlotAvailable =
                    !docInfo?.slots_booked?.[slotDate] ||
                    !docInfo.slots_booked[slotDate].includes(formattedTime)

                if (isSlotAvailable) {
                    timeSlots.push({ datetime: new Date(currentDate), time: formattedTime })
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            slots.push(timeSlots)
        }
        setDocSlot(slots)
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Login to book appointment')
            return navigate('/login')
        }
        try {
            const date = docSlot[slotIndex][0].datetime
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            const slotDate = day + "/" + month + "/" + year

            const { data } = await axios.post(backendURL + '/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctorsData()
                navigate('/my-appointment')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots()
        }
    }, [docInfo])

    if (!docInfo) return null

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 sm:px-6 md:px-10 py-10'>

            {/* Header */}
            <div className='mb-8'>
                <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-blue-100'>Book a Visit</span>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-800'>
                    Doctor <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400'>Appointment</span>
                </h1>
                <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-3'></div>
            </div>

            {/* Doctor Info Card */}
            <div className='flex flex-col sm:flex-row gap-6 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden'>

                {/* Doctor Image */}
                <div className='sm:w-64 md:w-72 flex-shrink-0 bg-gradient-to-br from-blue-100 to-cyan-100'>
                    <img
                        className='w-full h-full object-cover'
                        src={docInfo.image}
                        alt={docInfo.name}
                    />
                </div>

                {/* Doctor Details */}
                <div className='flex-1 p-6 sm:p-8 flex flex-col justify-center'>

                    {/* Name + Verified */}
                    <div className='flex items-center gap-2 mb-1'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>{docInfo.name}</h2>
                        <img className='w-5 h-5' src={assets.verified_icon} alt="verified" />
                    </div>

                    {/* Degree + Speciality + Experience */}
                    <div className='flex flex-wrap items-center gap-2 mb-4'>
                        <span className='text-sm text-gray-500'>{docInfo.degree} · {docInfo.speciality}</span>
                        <span className='inline-block bg-blue-50 text-blue-500 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100'>
                            {docInfo.experience}
                        </span>
                    </div>

                    {/* Divider */}
                    <div className='w-full h-px bg-gradient-to-r from-blue-100 via-cyan-100 to-transparent mb-4'></div>

                    {/* About */}
                    <div className='mb-5'>
                        <div className='flex items-center gap-2 mb-2'>
                            <div className='w-1 h-4 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full'></div>
                            <p className='text-sm font-bold text-gray-700 uppercase tracking-wide'>About</p>
                            <img src={assets.info_icon} alt="info" className='w-4 h-4 opacity-50' />
                        </div>
                        <p className='text-sm text-gray-500 leading-7 text-justify'>{docInfo.about}</p>
                    </div>

                    {/* Fee */}
                    <div className='inline-flex items-center gap-3 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl px-5 py-3 self-start'>
                        <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow'>
                            <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' />
                            </svg>
                        </div>
                        <div>
                            <p className='text-xs text-gray-400 font-medium'>Appointment Fee</p>
                            <p className='text-blue-600 font-bold text-lg'>{currencySymbol}{docInfo.fees}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Slots */}
            <div className='mt-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8'>

                <div className='flex items-center gap-2 mb-6'>
                    <div className='w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full'></div>
                    <p className='text-gray-800 font-bold text-base uppercase tracking-widest'>Select a Slot</p>
                </div>

                {/* Day Selector */}
                <div className='flex gap-3 overflow-x-auto pb-2'>
                    {docSlot.length > 0 && docSlot.map((item, index) => {
                        if (!item || item.length === 0) return null
                        return (
                            <div
                                key={index}
                                onClick={() => { setSlotIndex(index); setSlotTime('') }}
                                className={`flex flex-col items-center justify-center min-w-[64px] py-3 px-4 rounded-2xl cursor-pointer transition-all duration-300 flex-shrink-0 ${
                                    slotIndex === index
                                        ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-200'
                                        : 'bg-gray-50 border border-gray-100 text-gray-600 hover:border-blue-200 hover:text-blue-500'
                                }`}
                            >
                                <p className='text-xs font-semibold tracking-widest'>{daysOfWeek[item[0].datetime.getDay()]}</p>
                                <p className='text-xl font-bold mt-0.5'>{item[0].datetime.getDate()}</p>
                            </div>
                        )
                    })}
                </div>

                {/* Time Selector */}
                <div className='flex gap-2 mt-5 overflow-x-auto pb-2 flex-wrap'>
                    {docSlot.length > 0 && docSlot[slotIndex].map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setSlotTime(item.time)}
                            className={`px-4 py-2 text-sm rounded-xl cursor-pointer font-medium transition-all duration-300 flex-shrink-0 ${
                                slotTime === item.time
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md'
                                    : 'bg-gray-50 border border-gray-100 text-gray-600 hover:border-blue-200 hover:text-blue-500'
                            }`}
                        >
                            {item.time.toLowerCase()}
                        </button>
                    ))}
                </div>

                {/* Divider */}
                <div className='w-full h-px bg-gradient-to-r from-blue-100 via-cyan-100 to-transparent my-6'></div>

                {/* Book Button */}
                <div className='flex flex-col sm:flex-row items-center gap-4'>
                    <button
                        onClick={bookAppointment}
                        className='w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold px-10 py-3.5 rounded-full shadow-lg shadow-blue-200 hover:scale-105 hover:shadow-xl transition-all duration-300 group'
                    >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                        </svg>
                        Book Appointment
                        <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M17 8l4 4m0 0l-4 4m4-4H3' />
                        </svg>
                    </button>

                    {!slotTime && (
                        <p className='text-xs text-gray-400 italic'>Please select a time slot to continue</p>
                    )}
                </div>
            </div>

            {/* Related Doctors */}
            <div className='mt-10'>
                <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
            </div>
        </div>
    )
}

export default Appointment