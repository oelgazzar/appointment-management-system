import { useState } from "react";
import Modal from "../Modal";

const getStatusColorClass = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-success";
    case "pending":
      return "bg-warning";
    case "cancelled":
      return "bg-danger";
    default:
      return "";
  }
};

export default function Appointment({ a, onDeleteAppointment }) {
  const [showCloseButton, setShowCloseButton] = useState(false);

  return (
    <div className="card p-4 mb-4 rounded-1 position-relative">
      <div className="row">
        <div className="col-auto d-flex flex-column pe-4 border-end border-1 border-dark-50 text-center">
          <div className="fs-3 fw-light text-uppercase mb-1">
            {a.dayOfMonth}
          </div>
          <div className="fs-5 fw-light text-uppercase mb-1">{a.dayOfWeek}</div>
          <div className="fs-6 fw-light text-uppercase mb-1">{a.time}</div>
        </div>
        <div className="col d-flex">
          <div className="fs-3 text-uppercase align-self-center ms-4">
            {a.reasonForVisit}
          </div>
        </div>
      </div>
      <span
        className={
          "position-absolute end-0 bottom-0 m-2 badge " +
          getStatusColorClass(a.status)
        }
      >
        {a.status}
      </span>
      <button
        className={
          "btn position-absolute top-0 end-0 m-2 " +
          (!showCloseButton && "opacity-0")
        }
        onMouseOver={() => setShowCloseButton(true)}
        onMouseOut={() => setShowCloseButton(false)}
        data-bs-toggle="modal"
        data-bs-target={"#modal-" + a.id}
        data-testid="delete-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          fill="currentColor"
          className="bi bi-trash text-danger fs-5"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
        </svg>
      </button>
      <Modal
        id={"modal-" + a.id}
        title="Confirm Delete"
        message="Are sure you want to delete this appointment?"
        onConfirm={onDeleteAppointment}
      />
    </div>
  );
}
