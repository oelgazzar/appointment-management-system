/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/auth/login");
    }
  }, [loggedIn]);

  return loggedIn && <>{children}</>;
}
