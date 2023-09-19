import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useError } from "../error/ErrorProvider";

export default function Signup() {
  const navigate = useNavigate();
  const [, pushError] = useError();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      pushError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-50 mx-auto p-4 border rounded-2 bg-white d-flex flex-column justify-content-center"
    >
      <h1 className="text-center h2 mb-4">Sign Up</h1>
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
      <Link to="/auth/login" className="text-end mb-4">
        already have an account? login
      </Link>
      <button type="submit" className="btn btn-warning mx-auto">
        Signup
      </button>
    </form>
  );
}
