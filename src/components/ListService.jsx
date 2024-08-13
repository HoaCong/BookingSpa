import { formatCurrencyToK } from "helper/functions";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
const ArrowLeft = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="arrow-left"
    width="13px"
    height="13px"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
  </svg>
);
const Check = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="check"
    width="14px"
    height="14px"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
  </svg>
);

export default function ListService({
  setting: { colorone },
  list,
  selected: prevSelected = [],
  onBack,
  onSelect,
}) {
  const [selected, setSelected] = useState(prevSelected);
  const handleChoose = (item) => {
    setSelected((prevData) => {
      if (selected.includes(item)) return prevData.filter((e) => e !== item);
      return [...prevData, item];
    });
  };
  const handleSelect = () => {
    onSelect(selected);
  };

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="list_service">
      <div
        className="d-flex justify-content-between p-3 text-light"
        style={{ backgroundColor: colorone || "#0d6efd" }}
      >
        <div
          className="cursor-pointer d-flex justify-content-center align-items-center gap-1"
          onClick={() => onBack()}
        >
          <ArrowLeft /> Quay lại
        </div>
        <span className="text-14">1K=1000 đ</span>
      </div>
      <div className="px-2">
        <div className="d-flex justify-content-between p-2 pt-3">
          <div
            className="w-50 text-center text-14 cursor-pointer"
            onClick={() => scrollToId("TRIET_LONG")}
          >
            Liệu trình
          </div>
          <div
            className="w-50 text-center text-14 cursor-pointer"
            onClick={() => scrollToId("CHAM_DA")}
          >
            Thông thường
          </div>
        </div>
        <hr className="mt-0" />
        <div className="content_list_service">
          <div className="row row-cols-2 g-3">
            {list.map((item) => (
              <div className="col" key={item.id} id={item.category}>
                <Card className="h-100">
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body className="p-2 d-flex flex-column">
                    <Card.Title className="title-service">
                      {item.name} - {item.numbersesion} buổi
                    </Card.Title>
                    <div className="mb-2">
                      <div className="desc-service mb-3">
                        Thời gian: {item.time}
                      </div>
                      <div
                        className="price-service"
                        style={{ color: colorone || "#0d6efd" }}
                      >
                        {formatCurrencyToK(item.price)}
                      </div>
                    </div>
                    <Button
                      // variant="outline-primary"
                      variant={
                        selected?.includes(item) ? "primary" : "outline-primary"
                      }
                      className="w-100 mt-auto"
                      onClick={() => handleChoose(item)}
                      style={{
                        backgroundColor: selected?.includes(item)
                          ? colorone
                          : "transparent",
                        borderColor: selected?.includes(item)
                          ? "inherit"
                          : colorone,
                      }}
                    >
                      {selected?.includes(item) ? (
                        <span className="d-flex justify-content-center align-items-center gap-2">
                          <Check />
                          <span>Đã chọn</span>
                        </span>
                      ) : (
                        <span style={{ color: colorone || "inherit" }}>
                          Chọn
                        </span>
                      )}
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="footer_list_service py-2">
          <Button
            variant="primary"
            className="w-100"
            onClick={() => handleSelect()}
            style={{
              backgroundColor: colorone || "#0d6efd",
              borderColor: "inherit",
            }}
          >
            Tiếp tục ({selected.length} dịch vụ)
          </Button>
        </div>
      </div>
    </section>
  );
}
