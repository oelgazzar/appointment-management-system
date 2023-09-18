import { useNavigate } from "react-router";
import { useAppointments } from "./AppointmentProvider";
import { useState } from "react";
import { DateTime } from "luxon";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

export default function NewAppointment() {
  const { addAppointment } = useAppointments();
  const [newAppointment, setNewAppointment] = useState({});
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment({
      reasonForVisit: newAppointment.reasonForVisit,
      datetime: DateTime.fromFormat(
        newAppointment.date + newAppointment.time,
        "yyyy-MM-ddHH:mm"
      ).toISO(),
      status: "pending",
    });
    navigate("/");
  };

  return (
    <div className="card w-50 mx-auto p-4 mt-4">
      <h1 className="text-center">Book Now!</h1>
      <p>{Object.values(newAppointment).join(", ")}</p>
      <form method="post" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            className="form-control"
            value={auth.currentUser.displayName || auth.currentUser.email}
            onChange={handleChange}
            required
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="reasonForVisit" className="form-label">
            Reason For Visit
          </label>
          <input
            id="reasonForVisit"
            className="form-control"
            name="reasonForVisit"
            value={newAppointment.reasonForVisit || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="form-control"
            name="date"
            value={newAppointment.date || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            id="time"
            type="time"
            className="form-control"
            name="time"
            value={newAppointment.time || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-success me-2 px-4 rounded-1"
        >
          Submit
        </button>
        <Link to="/" className="btn btn-sm btn-danger px-4 rounded-1">
          Back
        </Link>
      </form>
    </div>
  );
}
