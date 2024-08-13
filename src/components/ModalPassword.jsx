import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
const initialPassword = new Array(6).fill("");
export default function ModalPassword({
  setting: { colorone, colortwo, colorthree },
  loading,
  data,
  visible,
  onClose,
  onSubmit,
  // setLogin,
  handleAddToast,
}) {
  const inputRefs = useRef([]);
  const [password, setPassword] = useState([...initialPassword]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (element, index) => {
    if (/^[0-9]$/.test(element.value) || element.value === "") {
      setPassword((oldValue) => {
        const newValue = [...oldValue];
        newValue[index] = element.value;
        inputRefs.current[index].value = element.value;
        return newValue;
      });
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      inputRefs.current[index].value = "";
    }
  };
  const handleKeyDown = (event, data, index) => {
    if (/^[0-9]$/.test(event.key) && data !== "") {
      setPassword((oldValue) => {
        const newValue = [...oldValue];
        newValue[index] = event.key;
        inputRefs.current[index].value = event.key;
        return newValue;
      });
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const parseAndFillOTP = (value) => {
    if (value.length === 6 && /^[0-9]+$/.test(value)) {
      let newPassword = value.split("");
      setPassword(newPassword);
    } else {
      handleAddToast({
        text: "Vui lòng nhập một chuỗi gồm 6 chữ số",
        type: "danger",
        title: "",
      });
    }
  };

  const handlePaste = (event) => {
    let pasteValue = event.clipboardData.getData("text");
    parseAndFillOTP(pasteValue);
    event.preventDefault();
  };

  const checkPassword = () => {
    const codepin = password.join("");
    if (codepin.length < 6) {
      handleAddToast({
        text: "Vui lòng nhập đầy đủ 6 chữ số",
        type: "danger",
        title: "",
      });
    } else onSubmit(codepin);
  };
  // const handleResetPassword = () => {
  //   setLogin((prevLogin) => ({
  //     ...prevLogin,
  //     type: "update",
  //     codepin: null,
  //   }));
  //   setPassword(() => {
  //     const newValue = [...initialPassword];
  //     newValue.forEach((item, index) => {
  //       inputRefs.current[index].value = item;
  //     });
  //     return newValue;
  //   });
  // };

  const title = () => {
    switch (data.type) {
      case "login":
        return "Nhập";
      case "register":
        return "Tạo";
      case "update":
        return "Đặt lại";
      default:
        return "Nhập";
    }
  };

  return (
    <>
      <Modal
        show={visible}
        onHide={onClose}
        centered
        dialogClassName="width-450"
      >
        <Modal.Header closeButton>
          <Modal.Title className="title-modal">{title()} mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="text-center content-modal px-4">
            {title()} mật khẩu của tài khoản: <span>{data.phone}</span>
          </div>
          <Form className="my-3 px-2 px-md-3 mt-4">
            <div className="d-flex justify-content-between">
              {password.map((data, index) => (
                <Form.Control
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="number"
                  className="password-input"
                  maxLength={1}
                  id={`passwordInput-${index}`}
                  defaultValue={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, data, index)}
                  onPaste={handlePaste}
                />
              ))}
            </div>
          </Form>
          {/* {data.type === "login" && (
            <div
              className="text-center text-14 text-primary cursor-pointer"
              onClick={() => handleResetPassword()}
            >
              Quên mật khẩu
            </div>
          )} */}
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex w-100 gap-3">
            <Button
              disabled={loading}
              variant="outline-secondary"
              onClick={onClose}
              className="w-50 py-2 text-14"
            >
              Quay lại
            </Button>
            <Button
              disabled={loading}
              variant="primary"
              onClick={checkPassword}
              className="w-50 py-2 text-18 d-flex justify-content-center align-items-center"
              style={{
                background: colorone || "unset",
                borderColor: "inherit",
              }}
            >
              {loading && (
                <div
                  className="spinner-border text-white me-2"
                  role="status"
                ></div>
              )}
              Tiếp tục
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
