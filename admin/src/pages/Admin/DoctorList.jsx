import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorList = () => {
    const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken]);

    if (!aToken)
        return <p className="m-5 text-gray-500">Please login to view doctors.</p>;

    return (
        <div className="m-5">
            <h1 className="text-xl font-semibold mb-6">All Doctors</h1>

            {doctors.length === 0 && (
                <p className="text-gray-500">No doctors found.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {doctors.map((doctor, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl cursor-pointer overflow-hidden shadow-sm hover:shadow-lg transition duration-300 group"
                    >
                        {/* Image */}
                        <div className="h-44 w-full bg-indigo-50 overflow-hidden">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="h-full w-full object-cover group-hover:bg-primary group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Dr. {doctor.name}
                            </h2>

                            <p className="text-sm text-gray-500 mb-3">
                                {doctor.speciality}
                            </p>

                            <div className='mt-2 flex items-center gap-1 text-sm'>
                                <input onChange={()=>changeAvailability(doctor._id)} type="checkbox" checked={doctor.available} id="" />
                                <p>Available</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorList;
