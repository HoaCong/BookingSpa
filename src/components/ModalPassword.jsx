import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
export default function ModalPassword() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputRefs = useRef([]);
  const [password, setPassword] = useState(new Array(6).fill(""));

  useEffect(() => {
    handleShow();
    inputRefs.current[0].focus();
  }, []);

  // const handleChange = (element, index) => {
  //   // Only allow a single digit (0-9) or an empty string
  //   if (/^[0-9]$/.test(element.value) || element.value === "") {
  //     let newPassword = [...password];
  //     newPassword[index] = element.value;
  //     setPassword(newPassword);

  //     // Move to next input if input is a number and it's not the last input
  //     if (element.value !== "" && index < 5) {
  //       document.getElementById(`passwordInput-${index + 1}`).focus();
  //     }
  //   }
  // };
  const handleKeyDown = (event, index) => {
    if (/^[0-9]$/.test(event.key)) {
      let newPassword = [...password];
      newPassword[index] = event.key;
      setPassword(newPassword);
      if (index < 5) {
        document.getElementById(`passwordInput-${index + 1}`).focus();
      }
    }
  };

  const parseAndFillOTP = (value) => {
    if (value.length === 6 && /^[0-9]+$/.test(value)) {
      let newPassword = value.split("");
      setPassword(newPassword);
    } else {
      // đưa cái alert lên
      alert("Vui lòng nhập một chuỗi gồm 6 chữ số.");
    }
  };

  const handlePaste = (event) => {
    let pasteValue = event.clipboardData.getData("text");
    parseAndFillOTP(pasteValue);
    event.preventDefault();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="width-450"
      >
        <Modal.Header closeButton>
          <Modal.Title className="title-modal">Nhập mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="text-center content-modal px-4">
            Nhập mật khẩu của tài khoản: <span>0528310199</span>
          </div>
          <Form className="my-3 px-2 px-md-3 mt-4">
            <div className="d-flex justify-content-between">
              {password.map((data, index) => (
                <Form.Control
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  className="password-input"
                  maxLength="1"
                  id={`passwordInput-${index}`}
                  defaultValue={data}
                  // onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                />
              ))}
            </div>
          </Form>
          <div className="text-center text-14 text-primary">Quên mật khẩu</div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex w-100 gap-3">
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              className="w-50 py-2 text-14"
            >
              Quay lại
            </Button>
            <Button
              variant="primary"
              onClick={handleClose}
              className="w-50 py-2 text-18"
            >
              Tiếp tục
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
