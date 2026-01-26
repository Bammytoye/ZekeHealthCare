import React from 'react'
import assets from '../assets/assets_frontend/assets'

const Contact = () => {
    return (
        <div>
            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
            </div>

            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm '>
                <img className='w-full md:max-w-[360px]' src={assets.about_image} alt={assets.about_image} />

                <div className='flex flex-col justify-center items-start gap-3'>
                    <p className='font-semibold text-lg text-gray-600'>Our Office</p>
                    <p className='text-gray-600'>123 Main Street, Nigeria</p>
                    <p className='text-gray-600'>Phone: 08169885711</p>
                    <p className='text-gray-600'>Email: bamigbalatoyese@gmail.com</p>
                    <p className='text-gray-600'>Learn more about our teams and job openings.</p>
                    <button className='bg-black text-white px-8 py-3 mt-4 hover:bg-white hover:text-black transition-all duration-500 hover:border-black border-2'>
                        Explore Jobs
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Contact