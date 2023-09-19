import { useNavigate } from "react-router";
import { useAppointments } from "./AppointmentProvider";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import AppointmentModel from "../../models/AppointmentModel";

export default function NewAppointment() {
  const { addAppointment } = useAppointments();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);

    addAppointment(
      new AppointmentModel({
        reasonForVisit: formData.get("reasonForVisit"),
        date: formData.get("date"),
        time: formData.get("time"),
      })
    );
    navigate("/");
  };

  return (
    <div className="container mt-4 position-relative">
      <div className="card w-50 mx-auto p-4 mt-4">
        <h1 className="text-center">Book Now!</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              className="form-control"
              value={auth.currentUser.displayName || auth.currentUser.email}
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
              defaultValue="follow up"
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
              defaultValue="2023-10-04"
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
              defaultValue="05:00"
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
    </div>
  );
}
