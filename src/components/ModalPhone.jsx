import { get } from "helper/ajax";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ModalPhone({
  loading,
  setLoading,
  visible,
  onClose,
  onSubmit,
}) {
  const [phone, setPhone] = useState("");
  const handleCheckPhone = async () => {
    try {
      setLoading((prevLoading) => ({ ...prevLoading, phone: true }));
      const { data } = await get(`/api/customer/check/${phone}`);
      if (!data.status) {
        onSubmit(phone);
      } else {
        alert("Không tìm thấy người dùng");
      }
      setLoading((prevLoading) => ({ ...prevLoading, phone: false }));
    } catch (error) {
      setLoading((prevLoading) => ({ ...prevLoading, phone: false }));
      alert(error);
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
