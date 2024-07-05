import { useEffect, useState } from "react";
import ListService from "./components/ListService";
import ModalLogin from "./components/ModalLogin";
// import ModalOTP from "./components/ModalOTP";
import Booking3Step from "components/Booking3Step";
import { get, post } from "helper/ajax";
import ModalPassword from "./components/ModalPassword";
const initialData = {
  factory: null,
  services: [],
  date: "",
  time: null,
  note: "",
};
function App() {
  const [visibleService, setVisibleService] = useState(false);
  const [login, setLogin] = useState({ phone: "", codepin: "" });
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [factories, setFactories] = useState([]);
  const [services, setServices] = useState([]);
  const [data, setData] = useState(initialData);

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
    const codepin = password.join("");
    setLogin((prevData) => ({ ...prevData, codepin }));
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
      alert(data.message);
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
      alert("Đặt lịch thành công");
      setData(initialData);
    }
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
          }}
          methods={{
            setData,
            handleSelectAddress,
            handleRemoveService,
            handleChooseService,
            handleSubmit,
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
        <ModalLogin
          visible={visibleLogin}
          onClose={() => login.phone && setVisibleLogin(false)}
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
            setLogin((prevData) => ({ ...prevData, phone: "" }));
          }}
          onSubmit={(password) => handleSubmitPassword(password)}
        />
      )}
    </div>
  );
}

export default App;
