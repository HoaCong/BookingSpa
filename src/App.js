import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ListService from "./components/ListService";
import ModalLogin from "./components/ModalLogin";
// import ModalOTP from "./components/ModalOTP";
import { get, post } from "helper/ajax";
import ModalPassword from "./components/ModalPassword";
import SwiperTime from "./components/SwiperTime";
function App() {
  const [visibleService, setVisibleService] = useState(false);
  const [login, setLogin] = useState({ phone: "", codepin: "" });
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [adress, setAddress] = useState([]);
  const [services, setServices] = useState([]);
  const [data, setData] = useState({
    address: null,
    services: [],
    date: null,
    time: null,
    note: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const expired = localStorage.getItem("expired");
    const now = new Date().getTime();
    const expired_at = new Date(expired).getTime();
    if (!token || expired_at < now) {
      setVisibleLogin(true);
    } else {
      callApiAddress();
      callApiService();
    }
    return () => {
      // second
    };
  }, []);

  const onChooseService = () => {
    setVisibleService(true);
  };
  const handleEnterPhone = (phone) => {
    // call api
    setLogin((data) => ({ ...data, phone }));
    setVisibleLogin(false);
    setVisiblePassword(true);
  };
  const handleSubmitPassword = async (password) => {
    const codepin = password.join("");
    setLogin((data) => ({ ...data, codepin }));
    const { data } = await post("/api/customer/login", { ...login, codepin });
    // call api
    if (data.status) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("expired", new Date().getTime() + 43200000);
      localStorage.setItem("idcustomer", data.customer.id);
      localStorage.setItem("phone", data.customer.phone);
      setVisiblePassword(false);
      callApiAddress();
      callApiService();
    } else {
      alert(data.message);
    }
  };

  const handleSelectAddress = (address) => {
    setData({ ...data, address });
  };

  const handleSelectService = (services) => {
    setData({ ...data, services });
    setVisibleService(false);
  };
  const handleRemoveService = (service) => {
    const newService = data.services.filter((item) => item.id !== service.id);
    setData({ ...data, services: newService });
  };

  const handleSubmit = async () => {
    const { data: res } = await post("/api/booking/create", {
      idcustomer: localStorage.getItem("idcustomer"),
      phone: localStorage.getItem("phone"),
      note: data.note,
      services: data.services,
      time: `${data.date}T${data.time}:00.000Z"`,
    });
    if (res.status) {
      alert("Đặt lịch thành công");
    }
  };

  // call API
  const callApiAddress = async () => {
    try {
      const { data } = await get("/api/factories");
      if (data.status) {
        setAddress(data.data);
      }
    } catch (error) {
      // alert(error);
    }
  };

  const callApiService = async () => {
    const { data } = await get("/api/product/active/search");
    if (data.status) {
      setServices(data.data);
    }
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
                    {data.address ? (
                      <div
                        className="p-3 d-flex justify-content-between rounded-3"
                        style={{ background: "#cfe2ff" }}
                      >
                        <div style={{ width: "100%", maxWidth: 350 }}>
                          {data.address}
                        </div>
                        <span
                          className="cursor-pointer"
                          onClick={() => setData({ ...data, address: null })}
                        >
                          <i className="fas fa-times text-primary"></i>
                        </span>
                      </div>
                    ) : (
                      <Form className="py-3">
                        {[1, 2, 3].map((type) => (
                          <div key={`default-${type}`} className="pb-3">
                            <Form.Check
                              className="d-flex align-items-center gap-3"
                              type="radio"
                              name="group1"
                              label={`CƠ SỞ: Số 6 - 8 ngõ 100 Trần Duy Hưng, Quận Cầu Giấy, Hà Nội ${type}`}
                              id={`address-${type}`}
                              onChange={() =>
                                handleSelectAddress(
                                  `CƠ SỞ: Số 6 - 8 ngõ 100 Trần Duy Hưng, Quận Cầu Giấy, Hà Nội ${type}`
                                )
                              }
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
                        <div
                          className="py-2 px-3 rounded-3"
                          style={{ background: "#cfe2ff" }}
                        >
                          {data.services.map((item, index) => (
                            <div
                              key={index}
                              className="d-flex py-2 my-1 border-bottom gap-2  text-14"
                            >
                              <div>
                                {index + 1}. {item.name} - {item.numbersesion}{" "}
                                buổi
                              </div>
                              <div className="ms-auto">{item.price} ₫</div>
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
                              {data.services.reduce(
                                (s, i) => (s += i.price),
                                0
                              )}
                              ₫
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <Button
                        disabled={!data.address}
                        variant="outline-primary"
                        className="w-50 rounded-pill btn-choose-service mt-3"
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
                          disabled={!data.address}
                          type="date"
                          placeholder="Chọn thời gian"
                          className="text-input"
                          onChange={(e) =>
                            setData({ ...data, date: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Form>
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
                  rows={3}
                  onChange={(e) => setData({ ...data, note: e.target.value })}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="w-100"
                onClick={handleSubmit}
              >
                Đặt lịch
              </Button>
            </div>
          </div>
        </div>
      )}
      {visibleService && (
        <ListService
          list={services}
          selected={data.services}
          onBack={() => setVisibleService(false)}
          onSelect={(services) => handleSelectService(services)}
        />
      )}
      {visibleLogin && (
        <ModalLogin
          visible={visibleLogin}
          onClose={() => setVisibleLogin(false)}
          onSubmit={(phone) => handleEnterPhone(phone)}
        />
      )}
      {/* <ModalOTP /> */}
      {visiblePassword && (
        <ModalPassword
          visible={visiblePassword}
          onClose={() => {
            setVisibleLogin(true);
            setVisiblePassword(false);
          }}
          onSubmit={(password) => handleSubmitPassword(password)}
        />
      )}
    </div>
  );
}

export default App;
