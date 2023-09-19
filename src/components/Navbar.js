import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "./auth/AuthProvider";
import logo from "../logo.png";

export default function Navbar() {
  const { loggedIn } = useAuth();

  return (
    <header
      className="navbar bg-dark position-fixed top-0 w-100 z-1"
      style={{ height: "var(--navbar-height)" }}
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" style={{ height: 35 }} className="me-2" />
          Appointment Management System
        </Link>

        {loggedIn && (
          <button className="btn btn-secondary" onClick={() => signOut(auth)}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
