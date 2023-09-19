/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Redirect from "../Redirect";
import appointmentImg2 from "./appointment.png";

export default function Home() {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <Redirect to="/appointments" />;
  }

  return (
    <>
      <div className="bg-dark row py-5 ps-5 align-items-center">
        <div className="col-6 text-light text-center">
          <h1>Book Your Clinic Appointment NOW!</h1>
          <p>Easy interface to manage your clinic visit appointments</p>
          <div className="hstack justify-content-center">
            <Link to="/auth/login" className="btn btn-light me-2">
              Login
            </Link>
            <Link to="/auth/signup" className="btn btn-outline-success">
              Signup
            </Link>
          </div>
        </div>
        <div className="col-6">
          <img src={appointmentImg2} alt="appointment" className="img-fluid" />
        </div>
      </div>
    </>
  );
}
