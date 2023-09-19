import { Link } from "react-router-dom";
import AppointmentList from "../appointments/AppointmentList";

export default function Appointments() {
  return (
    <>
      <Link
        to={"/appointments/new"}
        className="btn btn-sm rounded-1 btn-warning position-absolute end-0 me-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          fill="currentColor"
          className="bi bi-plus fs-5"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        Book Now
      </Link>

      <h2 className="text-center mb-4">Your Appointments</h2>

      <AppointmentList />
    </>
  );
}
