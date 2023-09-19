import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Progress from "./Progress";

import { useAuth } from "./auth/AuthProvider";
import Footer from "./Footer";
import Alert from "./Alert";
import { useError } from "./error/ErrorProvider";
import { useEffect } from "react";

export default function Root() {
  const { isAuthStateReady } = useAuth();
  const [error, pushError] = useError();

  useEffect(() => {
    let id;
    if (error) {
      id = setTimeout(() => {
        pushError(null);
      }, 2000);
    }
    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  });

  if (!isAuthStateReady) {
    return <Progress />;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        {error && (
          <Alert className="mx-auto">
            <p className="mb-0">{error}</p>
          </Alert>
        )}
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
