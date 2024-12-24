import React, { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import img1 from '../Images/IMG_1.jpg'
import img2 from '../Images/1 (1).jpg'
import img3 from '../Images/1 (2).jpg'
import img4 from '../Images/1 (3).jpg'
import img5 from '../Images/1 (4).jpg'

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';

const Swiper = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);

    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 800)}s`;
    };

    return (
        <div className="w-full mx-auto h-96 rounded-md bg-gray-900">
            <SwiperReact
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="w-full h-full"
            >
                <SwiperSlide className="flex items-center justify-center bg-gray-800 text-lg font-bold rounded-md">
                    <img className='w-full h-full' src={img1} alt="" />
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-white">
                            Join the Marathon Today!
                        </h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center bg-gray-700 text-lg font-bold rounded-md">
                    <img className='w-full h-full' src={img2} alt="" />
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-white">
                            Run for a Cause, Run for Health
                        </h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center bg-gray-800 text-lg font-bold rounded-md">
                    <img className='w-full h-full' src={img3} alt="" />
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-white">
                            Be Part of the Change
                        </h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center bg-gray-800 text-lg font-bold rounded-md">
                    <img className='w-full h-full' src={img4} alt="" />
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-white">
                            Join the Marathon Today!
                        </h2>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center bg-gray-700 text-lg font-bold rounded-md">
                    <img className='w-full h-full' src={img5} alt="" />
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-white">
                            Run for a Cause, Run for Health
                        </h2>
                    </div>
                </SwiperSlide>
                <div
                    className="absolute bottom-4 right-4 flex items-center justify-center w-12 h-12 text-sm font-bold text-primary"
                    slot="container-end"
                >
                    <svg
                        viewBox="0 0 48 48"
                        ref={progressCircle}
                        className="absolute w-full h-full stroke-current text-primary rotate-[-90deg]"
                    >
                        <circle
                            cx="24"
                            cy="24"
                            r="20"
                            className="fill-none stroke-current stroke-[4px] [stroke-dasharray:125.6] [stroke-dashoffset:calc(125.6px*(1-var(--progress)))]"
                        ></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </SwiperReact>
        </div>
    );
};

export default Swiper;