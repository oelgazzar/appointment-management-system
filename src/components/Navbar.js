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
        <Link to="/" className="navbar-brand me-auto">
          <img src={logo} alt="logo" style={{ height: 35 }} className="me-2" />
          Appointment Management System
        </Link>

        {loggedIn && (
          <>
            <div className="dropdown">
              <button
                className="btn d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt=""
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
                <strong>Omar</strong>
              </button>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <button className="dropdown-item">Settings</button>
                </li>
                <li>
                  <button className="dropdown-item">Profile</button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => signOut(auth)}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
