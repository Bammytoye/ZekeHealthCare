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

    /* ------------------ FETCH DOCTOR ------------------ */
    useEffect(() => {
        if (!doctorsData.length) return

        const doctor = doctorsData.find(doc => doc._id.toString() === docId)
        setDocInfo(doctor)
        // console.log('Doctor found:', doctor)
    }, [doctorsData, docId])

    /* ------------------ GENERATE SLOTS ------------------ */
    const getAvailableSlots = () => {
        let slots = []
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date(currentDate)
            endTime.setHours(21, 0, 0, 0)

            if (today.toDateString() === currentDate.toDateString()) {
                currentDate.setHours(
                    currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
                )
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10, 0, 0, 0)
            }

            let timeSlots = []

            while (currentDate < endTime) {

                const formattedTime = currentDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "/" + month + "/" + year

                const isSlotAvailable =
                    !docInfo?.slots_booked?.[slotDate] ||
                    !docInfo.slots_booked[slotDate].includes(formattedTime)

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime,
                    })
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

    useEffect(() => {
        // console.log('Slots:', docSlot)
    }, [docSlot])

    if (!docInfo) return null

    return (
        <div>
            {/* -------- Doctor Info -------- */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div>
                    <img
                        className="bg-primary w-full sm:max-w-72 rounded-lg"
                        src={docInfo.image}
                        alt={docInfo.name}
                    />
                </div>

                <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white">
                    <p className="flex items-center gap-2 text-2xl font-medium text-gray-700">
                        {docInfo.name}
                        <img className="w-5" src={assets.verified_icon} alt="verified" />
                    </p>

                    <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className="py-0.5 px-2 border text-xs rounded-full">
                            {docInfo.experience}
                        </button>
                    </div>

                    <div className="mt-3">
                        <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                            About <img src={assets.info_icon} alt="info" />
                        </p>
                        <p className="text-sm text-gray-500 mt-1 text-justify">
                            {docInfo.about}
                        </p>
                    </div>

                    <p className="text-gray-500 font-medium mt-4">
                        Appointment fee:{' '}
                        <span className="text-gray-400">
                            {currencySymbol}{docInfo.fees}
                        </span>
                    </p>
                </div>
            </div>

            {/* -------- Booking Slots -------- */}
            <div className="sm:ml-72 sm:pl-4 mt-8">
                <p className="font-medium text-gray-700">Booking Slots</p>

                {/* Days */}
                <div className="flex gap-2 mt-2 overflow-x-scroll">
                    {docSlot.length > 0 &&
                        docSlot.map((item, index) => {

                            if (!item || item.length === 0) return null

                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setSlotIndex(index)
                                        setSlotTime('')
                                    }}
                                    className={`text-center py-1 px-5 min-w-16 rounded-xl cursor-pointer
                                        ${slotIndex === index
                                            ? 'bg-primary text-white'
                                            : 'border border-gray-200 text-gray-600'}`}
                                >
                                    <p>{daysOfWeek[item[0].datetime.getDay()]}</p>
                                    <p>{item[0].datetime.getDate()}</p>
                                </div>
                            )
                        })
                    }

                </div>

                {/* Times */}
                <div className="flex gap-3 mt-4 overflow-x-scroll">
                    {docSlot.length > 0 &&
                        docSlot[slotIndex].map((item, index) => (
                            <p
                                key={index}
                                onClick={() => setSlotTime(item.time)}
                                className={`px-5 py-2 text-sm rounded-full cursor-pointer
                                ${slotTime === item.time
                                        ? 'bg-primary text-white'
                                        : 'border border-gray-300 text-gray-600'}`}
                            >
                                {item.time.toLowerCase()}
                            </p>
                        ))}
                </div>

                <button onClick={bookAppointment} className='bg-primary mx-auto flex text-white text-base font-light px-8 py-3 rounded-full my-6'>
                    Book an appointment
                </button>
            </div>

            <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
        </div>
    )
}

export default Appointment
