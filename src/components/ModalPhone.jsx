import { get } from "helper/ajax";
import { isValidPhoneNumber } from "helper/functions";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ModalPhone({
  setting: { colorone, colortwo, colorthree },
  loading,
  setLoading,
  visible,
  onClose,
  onSubmit,
  handleAddToast,
}) {
  const [phone, setPhone] = useState("");
  const handleCheckPhone = async () => {
    try {
      if (isValidPhoneNumber(phone)) {
        setLoading((prevLoading) => ({ ...prevLoading, phone: true }));
        const { data } = await get(`/api/customer/check/${phone}`);
        onSubmit(phone, data.status ? "register" : "login");
        setLoading((prevLoading) => ({ ...prevLoading, phone: false }));
      } else {
        handleAddToast({
          text: "Số điện thoại không hợp lệ",
          type: "danger",
          title: "",
        });
      }
    } catch (error) {
      setLoading((prevLoading) => ({ ...prevLoading, phone: false }));
      handleAddToast({
        text: "Xảy ra lỗi hệ thống",
        type: "danger",
        title: "",
      });
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
          <Modal.Title className="title-modal">Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="text-18">Số điện thoại của bạn là gì ạ?</div>
          <Form.Control
            type="text"
            id="phone"
            aria-describedby="phoneHelpBlock"
            placeholder="Nhập số điện thoại của bạn"
            className="mt-3 py-2"
            defaultValue={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!phone || loading}
            variant="primary"
            onClick={handleCheckPhone}
            className="w-100 py-2 fs-5 d-flex justify-content-center align-items-center"
            style={{ background: colorone || "unset", borderColor: "inherit" }}
          >
            {loading && (
              <div
                className="spinner-border text-white me-2"
                role="status"
              ></div>
            )}
            Tiếp tục
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
