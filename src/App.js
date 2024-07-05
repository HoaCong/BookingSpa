import { useEffect, useState } from "react";
import ListService from "./components/ListService";
import ModalPhone from "./components/ModalPhone";
// import ModalOTP from "./components/ModalOTP";
import Booking3Step from "components/Booking3Step";
import ToastSnackbar from "components/ToastSnackbar";
import { get, post } from "helper/ajax";
import ModalPassword from "./components/ModalPassword";
const initialData = {
  factory: null,
  services: [],
  date: "",
  time: null,
  note: "",
};
const initialLoading = {
  factories: false,
  phone: false,
  login: false,
  booking: false,
};
function App() {
  const [toasts, setToasts] = useState([]);
  const [visibleService, setVisibleService] = useState(false);
  const [login, setLogin] = useState({ phone: "", codepin: "" });
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [factories, setFactories] = useState([]);
  const [services, setServices] = useState([]);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(initialLoading);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const expired = +localStorage.getItem("expired");
    const now = new Date().getTime();
    const expired_at = new Date(expired).getTime();
    if (!token || expired_at < now) {
      setVisibleLogin(true);
      localStorage.removeItem("access_token");
      localStorage.removeItem("expired");
      localStorage.removeItem("idcustomer");
      localStorage.removeItem("phone");
    } else {
      callApiService();
    }
    callApiFactories();
    return () => {
      // second
    };
  }, []);

  const handleEnterPhone = (phone) => {
    setLogin((prevData) => ({ ...prevData, phone }));
    setVisibleLogin(false);
    setVisiblePassword(true);
  };

  const handleSubmitPassword = async (password) => {
    try {
      const codepin = password.join("");
      setLogin((prevData) => ({ ...prevData, codepin }));
      setLoading((prevLoading) => ({ ...prevLoading, login: true }));
      const { data } = await post("/api/customer/login", { ...login, codepin });
      // call api
      if (data.status) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("expired", new Date().getTime() + 43200000);
        localStorage.setItem("idcustomer", data.customer.id);
        localStorage.setItem("phone", data.customer.phone);
        setVisiblePassword(false);
        callApiService();
      } else {
        handleAddToast({
          text: "Mật khẩu không chính xác",
          type: "danger",
          title: "",
        });
      }
      setLoading((prevLoading) => ({ ...prevLoading, login: false }));
    } catch (error) {
      handleAddToast({
        text: "Xảy ra lỗi hệ thống",
        type: "danger",
        title: "",
      });
      setLoading((prevLoading) => ({ ...prevLoading, login: false }));
    }
  };

  const handleSelectAddress = (factory) => {
    setData({ ...data, factory });
  };

  const handleChooseService = () => {
    setVisibleService(true);
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
    try {
      setLoading((prevLoading) => ({ ...prevLoading, booking: true }));
      const { data: res } = await post("/api/booking/create", {
        idcustomer: localStorage.getItem("idcustomer"),
        phone: localStorage.getItem("phone"),
        note: data.note,
        factoryid: data.factory.id,
        services: JSON.stringify(
          data.services.map((item) => ({
            id: item.id,
            name: `${item.name} - ${item.numbersesion} buổi`,
          }))
        ),
        time: `${data.date}T${data.time}:00.000Z`,
      });
      if (res.status) {
        handleAddToast({
          text: "Đặt lịch thành công",
          type: "success",
          title: "",
        });
        setData(initialData);
      } else {
        handleAddToast({
          text: "Đặt lịch thất bại",
          type: "danger",
          title: "",
        });
      }
      setLoading((prevLoading) => ({ ...prevLoading, booking: false }));
    } catch (error) {
      setLoading((prevLoading) => ({ ...prevLoading, booking: false }));
      handleAddToast({
        text: "Đặt lịch thất bại",
        type: "danger",
        title: "",
      });
    }
  };

  const handleAddToast = (toast) => {
    const time = new Date().getTime();
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        ...toast,
        key: time,
      },
    ]);
  };

  // call API
  const callApiFactories = async () => {
    try {
      const { data } = await get("/api/factories");
      if (data.status) {
        setFactories(data.data);
      }
    } catch (error) {
      // alert(error);
    }
  };
  const callApiService = async () => {
    try {
      const { data } = await get("/api/product/active/search");
      if (data.status) {
        setServices(data.data);
      }
    } catch (error) {
      // alert(error);
    }
  };
  return (
    <div>
      {!visibleService && (
        <Booking3Step
          data={{
            data,
            factories,
            loading: loading.booking,
          }}
          methods={{
            setData,
            handleSelectAddress,
            handleRemoveService,
            handleChooseService,
            handleSubmit,
            setLoading,
          }}
        />
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
        <ModalPhone
          visible={visibleLogin}
          loading={loading.phone}
          setLoading={setLoading}
          onClose={() => login.phone && setVisibleLogin(false)}
          onSubmit={(phone) => handleEnterPhone(phone)}
          handleAddToast={handleAddToast}
        />
      )}
      {/* <ModalOTP /> */}
      {visiblePassword && (
        <ModalPassword
          phone={login.phone}
          visible={visiblePassword}
          loading={loading.login}
          setLoading={setLoading}
          onClose={() => {
            setVisibleLogin(true);
            setVisiblePassword(false);
            setLogin((prevData) => ({ ...prevData, phone: "" }));
          }}
          onSubmit={(password) => handleSubmitPassword(password)}
        />
      )}
      <ToastSnackbar toasts={toasts} setToasts={setToasts} />
    </div>
  );
}

export default App;
