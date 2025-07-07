import React, { useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { SliderSertifikat } from '../../data/sertifikat';
import '../assets/slider.css';
import '../index.css';

const SliderSertif = () => {
  const swiperWrapperRef = useRef(null);

  function adjustMargin() {
    const screenWidth = window.innerWidth;
    if (swiperWrapperRef.current) {
      swiperWrapperRef.current.style.marginLeft = screenWidth < 520 ? '0px' : screenWidth < 768 ? '20px' : screenWidth < 1024 ? '40px' : '60px';
    }
  }

  useEffect(() => {
    adjustMargin();
    window.addEventListener('resize', adjustMargin);
    return () => window.removeEventListener('resize', adjustMargin);
  }, []);

  return (
    <main className="main-slider">
      <div className="container-slider-swip">
        <Swiper
          modules={[Pagination]}
          grabCursor
          initialSlide={2}
          centeredSlides
          slidesPerView="auto"
          speed={800}
          slideToClickedSlide
          pagination={{ clickable: true }}
          breakpoints={{
            320: { spcaeBetween: 40 },
            640: { spaceBetween: 30 },
            768: { spaceBetween: 20 },
            1024: { spaceBetween: 10 },
          }}
          onSwiper={(swiper) => {
            swiperWrapperRef.current = swiper.wrapperEl;
          }}
        >
          {SliderSertifikat.map((item) => (
            <SwiperSlide key={item.id} className="flex flex-col items-center justify-center p-4">
              <img src={item.imgSrc} alt={item.title} className="img-slider" />
              <div className="title">
                <h1>{item.title}</h1>
              </div>
              <div className="content">
                <div className="text-box-slider">
                  <p>{item.description}</p>
                </div>
                <div className="footer">
                  <button className="label">Read more</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
};

export default SliderSertif;
