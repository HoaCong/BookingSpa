import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SwiperTime() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} slidesPerView={"auto"}>
        <SwiperSlide>
          <div className="w-100 d-flex flex-column gap-3">
            <div className="mx-2 rounded-3 option-time active">11:00</div>
            <div className="mx-2 rounded-3 option-time">11:30</div>
            <div className="mx-2 rounded-3 option-time">12:00</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-100 d-flex flex-column gap-3">
            <div className="mx-2 rounded-3 option-time">13:00</div>
            <div className="mx-2 rounded-3 option-time">13:30</div>
            <div className="mx-2 rounded-3 option-time">14:00</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-100 d-flex flex-column gap-3">
            <div className="mx-2 rounded-3 option-time">14:00</div>
            <div className="mx-2 rounded-3 option-time">14:00</div>
            <div className="mx-2 rounded-3 option-time">14:00</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-100 d-flex flex-column gap-3">
            <div className="mx-2 rounded-3 option-time">16:00</div>
            <div className="mx-2 rounded-3 option-time">16:00</div>
            <div className="mx-2 rounded-3 option-time">16:00</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-100 d-flex flex-column gap-3">
            <div className="mx-2 rounded-3 option-time">18:00</div>
            <div className="mx-2 rounded-3 option-time">18:00</div>
            <div className="mx-2 rounded-3 option-time">18:00</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-100 d-flex flex-column gap-3">
            <div className="mx-2 rounded-3 option-time">19:00</div>
            <div className="mx-2 rounded-3 option-time">19:00</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
