import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "./auth/AuthProvider";

export default function Navbar() {
  const { loggedIn } = useAuth();

  return (
    <header className="navbar bg-dark" data-bs-theme="dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
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
