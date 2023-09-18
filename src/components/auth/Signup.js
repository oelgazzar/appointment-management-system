import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          className="form-control"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          className="form-control"
        />
        <button type="submit" className="btn btn-success">
          Signup
        </button>
      </div>
    </form>
  );
}
