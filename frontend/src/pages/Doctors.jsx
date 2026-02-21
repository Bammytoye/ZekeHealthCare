import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AppContent } from '../context/AppContent'

const Doctors = () => {
    const { speciality } = useParams()
    const [filterDoctor, setFilterDoctor] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const navigate = useNavigate()

    const { doctorsData } = useContext(AppContent)

    const applyFilter = () => {
        if (speciality) {
            setFilterDoctor(doctorsData.filter(doc => doc.speciality === speciality))
        } else {
            setFilterDoctor(doctorsData)
        }
    }

    useEffect(() => {
        applyFilter()
    }, [doctorsData, speciality])


    const specialities = [
        'General Physician',
        'Gynecologist',
        'Dermatologist',
        'Pediatrician',
        'Neurologist',
        'Gastroenterologist',
    ];


    return (
        <div>
            <p className='text-gray-600'>Browse through the doctors specialist</p>

            <div className='flex flex-col sm:flex-row items-start gap-5 mt-1'>
                <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
                <div className={`'flex flex-col gap-4 text-sm text-gray-600 mt-3 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    {specialities.map((item) => (
                        <p
                            key={item}
                            onClick={() =>
                                speciality === item
                                    ? navigate('/doctors')
                                    : navigate(`/doctors/${item}`)
                            }
                            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer
        ${speciality === item ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                        >
                            {item}
                        </p>
                    ))}
                </div>


                <div className='w-full grid grid-cols-auto gap-4 pt-2 gap-y-6 px-3 sm:px-0'>
                    {filterDoctor.length === 0 && (
                        <p className="text-gray-500 text-3xl col-span-full flex justify-center mt-32 items-center text-center">
                            No doctors found for this speciality.
                        </p>
                    )}

                    {
                        filterDoctor.map((item, index) => (
                            <div
                                onClick={() => navigate(`/appointment/${item._id}`)}
                                key={index}
                                className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer
                        hover:-translate-y-2 transition-all duration-500 hover:shadow-lg'
                            >
                                <img
                                    className='bg-blue-100'
                                    src={item.image}
                                    alt={item.name}
                                />

                                <div className='p-2'>
                                    <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-red-500'} mb-1 justify-center md:justify-start`}>
                                        <span className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></span>
                                        <p className=''>{item.available ? 'Available' : 'Not Available'}</p>
                                    </div>

                                    <p className='text-gray-900 text-lg font-medium text-center md:text-left'>{item.name}</p>
                                    <p className='text-sm text-gray-600 text-center md:text-left'>{item.speciality}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Doctors