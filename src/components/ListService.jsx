import React from "react";
import { Button, Card } from "react-bootstrap";

export default function ListService({ onBack }) {
  return (
    <section className="list_service">
      <div className="d-flex justify-content-between p-2 bg-primary text-light">
        <div className="cursor-pointer" onClick={() => onBack()}>
          Quay lại
        </div>
        <span>1K=1000 đ</span>
      </div>
      <div className="px-2">
        <div className="d-flex justify-content-between p-2 pt-3">
          <div className="w-50 text-center cursor-pointer">Triệt lông</div>
          <div className="w-50 text-center cursor-pointer">Chăn sóc da</div>
        </div>
        <hr className="mt-0" />
        <div className="content_list_service">
          <div className="row row-cols-2 g-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="col">
                <Card>
                  <Card.Img
                    variant="top"
                    src="https://centbeauty.com/_next/image?url=https%3A%2F%2Fapi.cent.beauty%2Fuploads%2Ftriet3_a11d119158.jpg&w=640&q=75"
                  />
                  <Card.Body className="p-2">
                    <Card.Title className="title-service">
                      Triệt 1/2 tay dưới - 10 buổi
                    </Card.Title>
                    <Card.Text className="mb-2">
                      <div className="desc-service mb-3">
                        Thời gian: 15 phút
                      </div>
                      <div className="text-primary price-service">3.075K</div>
                    </Card.Text>
                    <Button variant="outline-primary" className="w-100">
                      Chọn
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div class="footer_list_service py-2">
          <Button variant="primary" className="w-100">
            Tiếp tục(1 dịch vụ)
          </Button>
        </div>
      </div>
    </section>
  );
}
