/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "../auth/AuthProvider";
import Redirect from "../Redirect";

export default function Home() {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <Redirect to="/appointments" />;
  }

  return <p>Home</p>;
}
