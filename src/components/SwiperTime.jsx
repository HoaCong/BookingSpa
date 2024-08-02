import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SwiperTime({ bgColor, time, onSelect }) {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} slidesPerView={"auto"}>
        <SwiperSlide>
          <div className="w-100 d-flex flex-column gap-3">
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "11:00" ? "active" : ""
              }`}
              style={{ background: (time === "11:00" && bgColor) || "inherit" }}
              onClick={() => onSelect("11:00")}
            >
              11:00
            </div>
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "11:30" ? "active" : ""
              }`}
              style={{ background: (time === "11:30" && bgColor) || "inherit" }}
              onClick={() => onSelect("11:30")}
            >
              11:30
            </div>
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "12:00" ? "active" : ""
              }`}
              style={{ background: (time === "12:00" && bgColor) || "inherit" }}
              onClick={() => onSelect("12:00")}
            >
              12:00
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-100 d-flex flex-column gap-3">
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "13:00" ? "active" : ""
              }`}
              style={{ background: (time === "13:00" && bgColor) || "inherit" }}
              onClick={() => onSelect("13:00")}
            >
              13:00
            </div>
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "13:30" ? "active" : ""
              }`}
              style={{ background: (time === "13:30" && bgColor) || "inherit" }}
              onClick={() => onSelect("13:30")}
            >
              13:30
            </div>
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "14:00" ? "active" : ""
              }`}
              style={{ background: (time === "14:00" && bgColor) || "inherit" }}
              onClick={() => onSelect("14:00")}
            >
              14:00
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-100 d-flex flex-column gap-3">
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "14:30" ? "active" : ""
              }`}
              style={{ background: (time === "14:30" && bgColor) || "inherit" }}
              onClick={() => onSelect("14:30")}
            >
              14:30
            </div>
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "15:00" ? "active" : ""
              }`}
              style={{ background: (time === "15:00" && bgColor) || "inherit" }}
              onClick={() => onSelect("15:00")}
            >
              15:00
            </div>
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "15:30" ? "active" : ""
              }`}
              style={{ background: (time === "15:30" && bgColor) || "inherit" }}
              onClick={() => onSelect("15:30")}
            >
              15:30
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-100 d-flex flex-column gap-3">
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "16:00" ? "active" : ""
              }`}
              style={{ background: (time === "16:00" && bgColor) || "inherit" }}
              onClick={() => onSelect("16:00")}
            >
              16:00
            </div>
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "16:30" ? "active" : ""
              }`}
              style={{ background: (time === "16:30" && bgColor) || "inherit" }}
              onClick={() => onSelect("16:30")}
            >
              16:30
            </div>
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "17:00" ? "active" : ""
              }`}
              style={{ background: (time === "17:00" && bgColor) || "inherit" }}
              onClick={() => onSelect("17:00")}
            >
              17:00
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-100 d-flex flex-column gap-3">
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "17:30" ? "active" : ""
              }`}
              style={{ background: (time === "17:30" && bgColor) || "inherit" }}
              onClick={() => onSelect("17:30")}
            >
              17:30
            </div>
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "18:00" ? "active" : ""
              }`}
              style={{ background: (time === "18:00" && bgColor) || "inherit" }}
              onClick={() => onSelect("18:00")}
            >
              18:00
            </div>
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "18:30" ? "active" : ""
              }`}
              style={{ background: (time === "18:30" && bgColor) || "inherit" }}
              onClick={() => onSelect("18:30")}
            >
              18:30
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-100 d-flex flex-column gap-3">
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "19:00" ? "active" : ""
              }`}
              style={{ background: (time === "19:00" && bgColor) || "inherit" }}
              onClick={() => onSelect("19:00")}
            >
              19:00
            </div>
            <div
              className={`mx-2 rounded-3 option-time ${
                time === "19:30" ? "active" : ""
              }`}
              style={{ background: (time === "19:30" && bgColor) || "inherit" }}
              onClick={() => onSelect("19:30")}
            >
              19:30
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
