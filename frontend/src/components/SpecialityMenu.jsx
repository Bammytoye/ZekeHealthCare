import React, { useRef, useState } from 'react';
import { specialityData } from '../assets/assets_frontend/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showHint, setShowHint] = useState(false);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
        sliderRef.current.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        sliderRef.current.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        sliderRef.current.style.cursor = 'grab';
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div
            id='speciality'
            className='flex flex-col items-center gap-4 py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-gray-800 bg-gradient-to-b from-white to-blue-50/40'
        >
            {/* Header */}
            <div className='flex flex-col items-center gap-3 mb-2'>
                <span className='text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 px-4 py-1.5 rounded-full'>
                    Our Specialities
                </span>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center leading-tight'>
                    Find by Speciality
                </h1>
                <p className='sm:w-1/3 md:w-2/3 lg:w-full text-center text-sm text-gray-500 leading-relaxed'>
                    Simply browse through our extensive list of trusted doctors,
                    schedule your appointment hassle-free.
                </p>
                <div className='w-12 h-1 bg-primary rounded-full mt-1' />
            </div>

            {/* Draggable Cards Row */}
            <div className='relative w-full'>

                {/* Drag hint — fades in on hover */}
                <div className={`absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-gray-400 bg-white border border-gray-100 shadow-sm px-3 py-1 rounded-full pointer-events-none transition-all duration-300 z-10 whitespace-nowrap
                    ${showHint ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                    <span>←</span>
                    <span>Drag to explore</span>
                    <span>→</span>
                </div>

            <div
                ref={sliderRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={() => { handleMouseLeave(); setShowHint(false); }}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowHint(true)}
                className='flex gap-3 sm:gap-4 lg:gap-6 pt-5 w-full overflow-x-auto pb-4 select-none'
                style={{ cursor: 'grab', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* Left padding spacer */}
                <div className='flex-shrink-0 w-2' />

                {specialityData.map((item, index) => (
                    <Link
                        onClick={() => scrollTo(0, 0)}
                        key={index}
                        to={`/doctors/${item.speciality}`}
                        draggable={false}
                        className='flex flex-col flex-shrink-0 items-center text-center
                            bg-white rounded-2xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7
                            min-w-[100px] sm:min-w-[120px] lg:min-w-[140px]
                            border border-gray-100
                            shadow-sm hover:shadow-xl hover:shadow-primary/10
                            hover:-translate-y-2 hover:border-primary/30
                            transition-all duration-300 group'
                    >
                        {/* Icon wrapper */}
                        <div className='w-14 h-14 lg:w-20 lg:h-20 rounded-2xl bg-primary/8 group-hover:bg-primary/15 flex items-center justify-center mb-3 transition-colors duration-300'>
                            <img
                                src={item.image}
                                alt={item.speciality}
                                className='w-9 sm:w-11 lg:w-13'
                                draggable={false}
                            />
                        </div>

                        {/* Label */}
                        <p className='text-xs sm:text-sm font-medium text-gray-600 group-hover:text-primary transition-colors duration-300 leading-snug'>
                            {item.speciality}
                        </p>
                    </Link>
                ))}

                {/* Right padding spacer */}
                <div className='flex-shrink-0 w-2' />
            </div>
            </div>
        </div>
    );
};

export default SpecialityMenu;