import React from 'react'
import assets from '../assets/assets_frontend/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt={assets.logo} />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat eveniet maxime inventore repudiandae atque accusantium reiciendis sint a, obcaecati quia debitis voluptatum vero saepe temporibus quibusdam excepturi odit libero totam ex. Sapiente dolorem maiores veniam consectetur maxime non nisi perferendis odit rem alias obcaecati odio in quibusdam, voluptate nemo error soluta.</p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>

                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+2348169885711</li>
                        <li>bamigbalatoyese@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center '>Copyright 2026@ ZekeTech - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer