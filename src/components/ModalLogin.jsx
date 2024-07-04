import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ModalLogin() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleShow();
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="width-450"
      >
        <Modal.Header closeButton>
          <Modal.Title className="title-modal">Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div class="text-18">Số điện thoại của bạn là gì ạ?</div>
          <Form.Control
            type="text"
            id="phone"
            aria-describedby="phoneHelpBlock"
            placeholder="Nhập số điện thoại của bạn"
            className="mt-3 py-2"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClose}
            className="w-100 py-2 fs-5"
          >
            Tiếp tục
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
