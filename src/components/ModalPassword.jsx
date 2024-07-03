import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
export default function ModalPassword() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  useEffect(() => {
    handleShow();
    inputRefs.current[0].focus();
  }, []);

  // const handleChange = (element, index) => {
  //   // Only allow a single digit (0-9) or an empty string
  //   if (/^[0-9]$/.test(element.value) || element.value === "") {
  //     let newOtp = [...otp];
  //     newOtp[index] = element.value;
  //     setOtp(newOtp);

  //     // Move to next input if input is a number and it's not the last input
  //     if (element.value !== "" && index < 5) {
  //       document.getElementById(`otpInput-${index + 1}`).focus();
  //     }
  //   }
  // };
  const handleKeyDown = (event, index) => {
    if (/^[0-9]$/.test(event.key)) {
      let newOtp = [...otp];
      newOtp[index] = event.key;
      setOtp(newOtp);
      if (index < 5) {
        document.getElementById(`otpInput-${index + 1}`).focus();
      }
    }
  };

  const parseAndFillOTP = (value) => {
    if (value.length === 6 && /^[0-9]+$/.test(value)) {
      let newOtp = value.split("");
      setOtp(newOtp);
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
          <Modal.Title>Nhập mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="text-center" style={{ fontSize: 18 }}>
            Nhập mật khẩu của tài khoản: <span>0528310199</span>
          </div>
          <Form className="my-3">
            <Row className="justify-content-center">
              {otp.map((data, index) => (
                <Col key={index} xs="auto">
                  <Form.Control
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    className="otp-input"
                    maxLength="1"
                    id={`otpInput-${index}`}
                    defaultValue={data}
                    // onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    style={{
                      width: "40px",
                      height: "40px",
                      textAlign: "center",
                      border: "2px solid rgb(163, 163, 163)",
                    }}
                  />
                </Col>
              ))}
            </Row>
          </Form>
          <div className="text-center">Quên mật khẩu</div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex w-100 gap-3">
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              className="w-50 py-2 fs-5"
            >
              Quay lại
            </Button>
            <Button
              variant="primary"
              onClick={handleClose}
              className="w-50 py-2 fs-5"
            >
              Tiếp tục
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
