import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ModalLogin({ visible, onClose, onSubmit }) {
  const [phone, setPhone] = useState("");
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
            variant="primary"
            onClick={() => onSubmit(phone)}
            className="w-100 py-2 fs-5"
          >
            Tiếp tục
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
