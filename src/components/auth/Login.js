/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useError } from "../error/ErrorProvider";

export default function Login() {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const [, pushError] = useError();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      pushError(err.message);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-50 mx-auto p-4 border rounded-2 bg-white d-flex flex-column justify-content-center"
    >
      <h1 className="text-center h2 mb-4">Login</h1>
      <div className="mb-4">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          className="form-control"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          className="form-control"
        />
      </div>
      <Link to="/auth/signup" className="text-end mb-4">
        don't have acount? signup
      </Link>
      <button type="submit" className="btn btn-success mx-auto">
        Login
      </button>
    </form>
  );
}
