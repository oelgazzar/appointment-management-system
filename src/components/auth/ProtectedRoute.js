import { useAuth } from "./AuthProvider";
import Redirect from "../Redirect";

export default function ProtectedRoute({ children }) {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}
