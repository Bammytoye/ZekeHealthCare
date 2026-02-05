import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';

const DoctorList = () => {
    const { doctors, aToken, getAllDoctors, backendUrl } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken]);

    if (!aToken) return <p className='m-5 text-gray-500'>Please login to view doctors.</p>;

    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-lg font-medium'>All Doctors</h1>

            {doctors.length === 0 && <p className='mt-4 text-gray-500'>No doctors found.</p>}

            <div className='w-full flex flex-wrap gap-y-6 pt-5'>
                {doctors.map((doctor, index) => (
                    <div
                        className='border border-indigo-200 rounded-xl max-w-50 overlflow-hidden cursor-pointer group'
                        key={index}
                    >
                        <img
                            src={`${backendUrl}/${doctor.image}`}
                            alt={doctor.name}
                            className="bg-indigo-50 group-hover:bg-primary-primary transition-all duration-500 "
                        />

                        <div className='p-4'>
                            <p className='text-neutral-800 text-lg font-medium'>{doctor.name}</p>
                            <p className='text-zinc-600 text-sm'>{doctor.speciality}</p>

                            <div className='mt-2 flex items-center gap-1 text-sm'>
                                <input type="checkbox" checked={doctor.available} readOnly />
                                <p className='text-sm'>Available</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DoctorList
