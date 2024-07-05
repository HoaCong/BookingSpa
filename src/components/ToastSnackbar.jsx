import { Toast, ToastContainer } from "react-bootstrap";

function ToastSnackbar({ toasts, setToasts }) {
  const handleClose = (toast) => {
    const newToasts = toasts.filter((item) => item.key !== toast.key);
    setToasts(newToasts);
  };
  return (
    <ToastContainer
      position="top-center"
      className="p-3 position-fixed"
      style={{ zIndex: 3101 }}
    >
      {toasts.map((toast, index) => (
        <Toast
          key={toast.key}
          autohide
          delay={3000}
          className={`mb-3 bg-light border border-${toast.type}`}
          onClose={() => handleClose(toast)}
        >
          {toast.title && (
            <Toast.Header>
              <small className="ms-auto">{toast.title}</small>
            </Toast.Header>
          )}
          <Toast.Body className="text-dark ps-4">
            {toast.type === "danger" && (
              <i className={`me-2 far fa-times-circle text-${toast.type}`}></i>
            )}
            {toast.type === "success" && (
              <i className={`me-2 far fa-check-circle text-${toast.type}`}></i>
            )}
            {toast.text}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}

export default ToastSnackbar;
