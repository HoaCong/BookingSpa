import logoDefault from "assets/images/logo.png";
import { formatCurrency } from "helper/functions";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import LazyLoadImage from "./LazyLoadImage";
import SwiperTime from "./SwiperTime";
export default function Booking3Step({
  data: {
    // setting: { colorone, colortwo, colorthree, numberPhone, logo },
    data,
    factories,
    loading,
  },
  methods: {
    setData,
    handleSelectAddress,
    handleRemoveService,
    handleChooseService,
    handleSubmit,
  },
}) {
  // colorone: "#e96512";
  // colorthree: "#e5b591";
  // colortwo: "#e77829";
  const color_bg_1 = "#e96512";
  const color_bg_2 = "#e77829";
  const color_bg_3 = "#e5b591";
  const logo = "https://imgur.com/WZPKu5s.png";
  const numberPhone = "1900686868";
  const svgString = encodeURIComponent(
    `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
       <path fill="${color_bg_1}" d="M 0.513 274.158 C -253.073 -353.471 859.722 -345.823 501.476 342.796 C 349.82 253.786 209.056 446.27 0.513 274.158 Z"></path>
     </svg>`
  );
  const backgroundImage = `url("data:image/svg+xml,${svgString}")`;
  return (
    <div
      className="m-auto booking-container p-2 pt-3 p-md-3 pt-md-4"
      style={{ backgroundImage, backgroundColor: color_bg_3 }}
    >
      <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
        <LazyLoadImage
          alt={logo}
          src={logo}
          defaultImage={logoDefault}
          className="logo"
        />
        <div className="text-light hotline">
          <span className="me-3">Hotline</span>{" "}
          {(numberPhone || "####.###.###").replace(
            /(\d{4})(\d{3})(\d{3})/,
            "$1.$2.$3"
          )}
        </div>
      </div>
      <div className="booking-content">
        <div
          className="content-header text-center text-light"
          style={{ background: color_bg_2 }}
        >
          Đặt lịch 3 bước
        </div>
        <div className="p-2 p-md-3">
          <section>
            <ul className="timeline">
              <li className="timeline-item">
                <div
                  className="dot_timeline"
                  style={{ backgroundColor: color_bg_1 || "inherit" }}
                ></div>
                <div
                  className="line_timeline"
                  style={{ backgroundColor: color_bg_1 || "inherit" }}
                ></div>
                <div
                  className="title-timeline"
                  style={{ color: color_bg_1 || "#0d6efd" }}
                >
                  1. Chọn chi nhánh
                </div>
                {data.factory ? (
                  <div
                    className="p-3 d-flex justify-content-between rounded-3 bg-blue-50"
                    style={{
                      backgroundColor: color_bg_3 || "inherit",
                    }}
                  >
                    <div style={{ width: "100%", maxWidth: 350 }}>
                      {data.factory.name}
                    </div>
                    <span
                      className="cursor-pointer"
                      onClick={() => setData({ ...data, factory: null })}
                    >
                      <i
                        className="fas fa-times"
                        style={{ color: color_bg_1 || "#0d6efd" }}
                      ></i>
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
                <div
                  className="dot_timeline"
                  style={{ backgroundColor: color_bg_1 || "inherit" }}
                ></div>
                <div
                  className="line_timeline"
                  style={{ backgroundColor: color_bg_1 || "inherit" }}
                ></div>
                <div
                  className="title-timeline"
                  style={{ color: color_bg_1 || "#0d6efd" }}
                >
                  2. Chọn dịch vụ
                </div>
                <div className="text-center pb-3">
                  {data.services.length ? (
                    <div
                      className="py-2 px-3 rounded-3 bg-blue-50"
                      style={{ backgroundColor: color_bg_3 }}
                    >
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
                              className="fas fa-times"
                              style={{ color: color_bg_1 || "#0d6efd" }}
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
                    style={{
                      backgroundColor: "inherit",
                      borderColor: color_bg_1,
                      color: color_bg_1 || "inherit",
                    }}
                  >
                    + Chọn dịch vụ
                  </Button>
                </div>
              </li>

              <li className="timeline-item text-input">
                <div
                  className="dot_timeline"
                  style={{ backgroundColor: color_bg_1 || "inherit" }}
                ></div>
                <div
                  className="title-timeline"
                  style={{ color: color_bg_1 || "#0d6efd" }}
                >
                  3. Chọn thời gian
                </div>
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
                      bgColor={color_bg_3}
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
            <Form.Label style={{ color: color_bg_1 || "#0d6efd" }}>
              Ghi chú
            </Form.Label>
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
            style={{
              background: color_bg_1 || "inherit",
              borderColor: "inherit",
            }}
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
