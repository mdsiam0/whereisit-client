import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "motion/react"
import slideimg1 from "../assets/slide1.jpg"
import slideimg2 from "../assets/slide2.jpg"
import slideimg3 from "../assets/slide3.jpg"

const slides = [
  {
    title: "Lost Something?",
    desc: "WhereIsIt connects people to reunite with their lost belongings. Post a lost item or check the found list now!",
    img: slideimg1,
  },
  {
    title: "Found Something?",
    desc: "Help someone reclaim their lost item. Post it here and be a real-world hero.",
    img: slideimg2,
  },
  {
    title: "Connecting People",
    desc: "We bridge the gap between lost and found with a simple, secure and friendly interface.",
    img: slideimg3,
  },
];

const Banner = () => {
  return (
    <div className="w-full flex justify-center mt-20 px-4  md:px-6">
      <div className="w-full max-w-[1500px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
          className="rounded-xl overflow-hidden"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[50vh] md:h-[60vh]">
              
                <div
                  className="absolute inset-0 bg-cover bg-center filter blur-xs brightness-75"
                  style={{ backgroundImage: `url(${slide.img})` }}
                ></div>

                
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4"
                >
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-2xl max-w-3xl drop-shadow-md">
                    {slide.desc}
                  </p>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
