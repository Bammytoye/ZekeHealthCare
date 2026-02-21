import { useContext, useEffect, useState } from 'react'
import { AppContent } from '../context/AppContent'
import { useNavigate } from 'react-router-dom'

const RelatedDoctor = ({ docId, speciality }) => {
    const { doctorsData } = useContext(AppContent)
    const [relatedDoctors, setRelatedDoctors] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!doctorsData.length || !speciality) return

        const filteredDoctors = doctorsData.filter(
            doc => doc.speciality === speciality && doc._id !== docId
        )

        setRelatedDoctors(filteredDoctors)
    }, [doctorsData, speciality, docId])

    if (!relatedDoctors.length) return null

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
            <h1 className="text-3xl font-medium">Related Doctors</h1>

            <p className="sm:w-2/3 text-center text-sm">
                Doctors in the same speciality you may be interested in.
            </p>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 px-3 sm:px-0">
                {relatedDoctors.slice(0, 5).map((item) => (
                    <div
                        key={item._id}
                        onClick={() => {
                            navigate(`/appointment/${item._id}`)
                            window.scrollTo(0, 0)
                        }}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer
                        hover:-translate-y-2 transition-all duration-500 hover:shadow-lg"
                    >
                        <img
                            className="bg-blue-100 w-full"
                            src={item.image}
                            alt={item.name}
                        />

                        <div className="p-3">
                            <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-red-500'} mb-1 justify-center md:justify-start`}>
                                <span className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></span>
                                <p className=''>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>

                            <p className="text-gray-900 font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => {
                    navigate('/doctors')
                    window.scrollTo(0, 0)
                }}
                className="bg-blue-100 text-gray-700 px-12 py-3 rounded-full mt-10"
            >
                More
            </button>
        </div>
    )
}

export default RelatedDoctor
