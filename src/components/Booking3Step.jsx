import { formatCurrency } from "helper/functions";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import SwiperTime from "./SwiperTime";
export default function Booking3Step({
  data: { data, factories, loading },
  methods: {
    setData,
    handleSelectAddress,
    handleRemoveService,
    handleChooseService,
    handleSubmit,
  },
}) {
  const color_bg = "#0d6efd";
  const svgString = encodeURIComponent(
    `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
       <path fill="${color_bg}" d="M 0.513 274.158 C -253.073 -353.471 859.722 -345.823 501.476 342.796 C 349.82 253.786 209.056 446.27 0.513 274.158 Z"></path>
     </svg>`
  );
  const backgroundImage = `url("data:image/svg+xml,${svgString}")`;
  return (
    <div
      className="m-auto booking-container p-2 pt-3 p-md-3 pt-md-4"
      style={{ backgroundImage }}
    >
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
                {data.factory ? (
                  <div className="p-3 d-flex justify-content-between rounded-3 bg-blue-50">
                    <div style={{ width: "100%", maxWidth: 350 }}>
                      {data.factory.name}
                    </div>
                    <span
                      className="cursor-pointer"
                      onClick={() => setData({ ...data, factory: null })}
                    >
                      <i className="fas fa-times text-primary"></i>
                    </span>
                  </div>
                ) : (
                  <Form className="py-3">
                    {factories.map((item) => (
                      <div key={`factory-${item.id}`} className="pb-3">
                        <Form.Check
                          className="d-flex align-items-center gap-3"
                          type="radio"
                          name="group1"
                          label={item.name}
                          id={`factory-${item.id}`}
                          onChange={() => handleSelectAddress(item)}
                        />
                      </div>
                    ))}
                  </Form>
                )}
              </li>

              <li className="timeline-item">
                <div className="title-timeline">2. Chọn dịch vụ</div>
                <div className="text-center pb-3">
                  {data.services.length ? (
                    <div className="py-2 px-3 rounded-3 bg-blue-50">
                      {data.services.map((item, index) => (
                        <div
                          key={index}
                          className="d-flex py-2 my-1 border-bottom gap-2  text-14"
                        >
                          <div>
                            {index + 1}. {item.name} - {item.numbersesion} buổi
                          </div>
                          <div className="ms-auto">
                            {formatCurrency(item.price)}
                          </div>
                          <span className="cursor-pointer">
                            <i
                              className="fas fa-times text-primary"
                              onClick={() => handleRemoveService(item)}
                            ></i>
                          </span>
                        </div>
                      ))}
                      <div className="d-flex">
                        <div>Tổng:</div>
                        <div className="ms-auto">
                          {formatCurrency(
                            data.services.reduce((s, i) => (s += i.price), 0)
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <Button
                    disabled={!data.factory}
                    variant="outline-primary"
                    className="w-50 rounded-pill btn-choose-service mt-3"
                    onClick={() => handleChooseService()}
                  >
                    + Chọn dịch vụ
                  </Button>
                </div>
              </li>

              <li className="timeline-item text-input">
                <div className="title-timeline">3. Chọn thời gian</div>
                <div className="mt-2">
                  <DatePicker
                    disabled={!data.factory}
                    placeholderText="Chọn thời gian"
                    selected={data.date}
                    dateFormat="dd/MM/yyyy" // Định dạng ngày
                    className="form-control py-2 w-100 text-14"
                    minDate={new Date()}
                    isClearable={true}
                    onChange={(date) => {
                      setData({ ...data, date });
                    }}
                  />
                </div>
                {/* <div className="p-3 border rounded-3 text-center alert-time">
                Cơ sở đã quá tải vào ngày này, vui lòng chọn cơ sở khác
                hoặc ngày sau đó
              </div> */}
                {data.date && (
                  <>
                    <div className="my-3">
                      Chọn khung giờ (từ 11:00 đến 19:30)
                    </div>
                    <SwiperTime
                      time={data.time}
                      onSelect={(time) => setData({ ...data, time })}
                    />
                  </>
                )}
              </li>
            </ul>
          </section>
          <Form.Group
            className="mb-3 ps-3 text-pink"
            controlId="form.description"
          >
            <Form.Label className="text-primary">Ghi chú</Form.Label>
            <Form.Control
              as="textarea"
              value={data.note}
              rows={3}
              onChange={(e) => setData({ ...data, note: e.target.value })}
            />
          </Form.Group>
          <Button
            disabled={loading}
            variant="primary"
            onClick={handleSubmit}
            className="fs-5 w-100 d-flex justify-content-center align-items-center"
          >
            {loading && (
              <div
                className="spinner-border text-white me-2"
                role="status"
              ></div>
            )}
            Đặt lịch
          </Button>
        </div>
      </div>
    </div>
  );
}
