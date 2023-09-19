/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Redirect from "../Redirect";
import appointmentImg from "./appointment.png";
import easyManageImg from "./easy-manage.jpeg";
import mailNotificationImg from "./mail-notification.jpeg";
import adminImg from "./admin.png";

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
          <img src={appointmentImg} alt="appointment" className="img-fluid" />
        </div>
      </div>
      <div className="container p-4 text-black-50">
        <div className="text-center mb-5 row align-items-center">
          <h2 className="col order-1">Easily Manage Your Appointments</h2>
          <div className="col">
            <img
              className="img-fluid rounded-circle"
              src={easyManageImg}
              alt="Easily Manage Your Appointments"
              style={{ width: 300, height: 300 }}
            />
          </div>
        </div>
        <div className="text-center mb-5 row align-items-center">
          <h2 className="col">Get Notification By Emails</h2>
          <div className="col">
            <img
              className="img-fluid rounded-circle"
              src={mailNotificationImg}
              alt="Get Notification By Emails"
              style={{ width: 300, height: 300 }}
            />
          </div>
        </div>
        <div className="text-center mb-5 row align-items-center">
          <h2 className="col order-1">Admin Dashboard And Powerful Control</h2>
          <div className="col">
            <img
              className="img-fluid rounded-circle"
              src={adminImg}
              alt="dmin Dashboard And Powerful Control"
              style={{ width: 300, height: 300 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
