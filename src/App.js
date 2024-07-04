import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ListService from "./components/ListService";
import ModalLogin from "./components/ModalLogin";
import ModalOTP from "./components/ModalOTP";
import ModalPassword from "./components/ModalPassword";
import SwiperTime from "./components/SwiperTime";

function App() {
  const [visibleService, setVisibleService] = useState(false);
  const onChooseService = () => {
    setVisibleService(true);
  };
  return (
    <div>
      {!visibleService && (
        <div className="m-auto booking-container p-2 pt-3 p-md-3 pt-md-4">
          <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
            <img
              alt="cent beauty"
              src="https://centbeauty.com/assets/images/logo-booking.svg"
              decoding="async"
              data-nimg="intrinsic"
              className="logo"
              srcSet="https://centbeauty.com/assets/images/logo-booking.svg 1x, https://centbeauty.com/assets/images/logo-booking.svg 2x"
            />
            <div className="text-light hotline">
              <span className="me-3">Hotline</span> 1900.636.833
            </div>
          </div>
          <div className="booking-content">
            <div className="content-header text-center text-light">
              Đặt lịch 3 bước
            </div>
            <div className="p-2 p-md-3">
              <section>
                <ul className="timeline">
                  <li className="timeline-item">
                    <div className="title-timeline"> 1. Chọn chi nhánh</div>
                    <Form className="py-3">
                      {[1, 2, 3].map((type) => (
                        <div key={`default-${type}`} className="pb-3">
                          <Form.Check
                            className="d-flex align-items-center gap-3"
                            type="radio"
                            name="group1"
                            label={`CƠ SỞ: Số 6 - 8 ngõ 100 Trần Duy Hưng, Quận Cầu Giấy, Hà Nội ${type}`}
                            id={`disabled-default-${type}`}
                          />
                        </div>
                      ))}
                    </Form>
                  </li>

                  <li className="timeline-item">
                    <div className="title-timeline">2. Chọn dịch vụ</div>
                    <div className="text-center py-3">
                      <Button
                        variant="outline-primary"
                        className="w-50 rounded-pill btn-choose-service"
                        onClick={() => onChooseService()}
                      >
                        + Chọn dịch vụ
                      </Button>
                    </div>
                  </li>

                  <li className="timeline-item text-input">
                    <div className="title-timeline">3. Chọn thời gian</div>
                    <Form className="mt-2">
                      <Form.Group className="mb-3" controlId="form.date">
                        <Form.Control
                          type="date"
                          placeholder="Chọn thời gian"
                          className="text-input"
                        />
                      </Form.Group>
                    </Form>
                    {/* <div className="p-3 border rounded-3 text-center alert-time">
                    Cơ sở đã quá tải vào ngày này, vui lòng chọn cơ sở khác hoặc
                    ngày sau đó
                  </div> */}
                    <div className="my-3">
                      Chọn khung giờ (từ 11:00 đến 19:30)
                    </div>
                    <SwiperTime />
                  </li>
                </ul>
              </section>
              <Form.Group
                className="mb-3 ps-3 text-pink"
                controlId="form.description"
              >
                <Form.Label className="text-primary">Ghi chú</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Button variant="primary" className="w-100">
                Đặt lịch
              </Button>
            </div>
          </div>
        </div>
      )}
      {visibleService && (
        <ListService onBack={() => setVisibleService(false)} />
      )}
      <ModalLogin />
      <ModalOTP />
      <ModalPassword />
    </div>
  );
}

export default App;
