import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Progress from "./Progress";

import { useAuth } from "./auth/AuthProvider";
import Footer from "./Footer";
import Alert from "./Alert";
import { useError } from "./error/ErrorProvider";

export default function Root() {
  const { isAuthStateReady } = useAuth();
  const [error] = useError();

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
