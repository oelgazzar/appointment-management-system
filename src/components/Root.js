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
      {error && <Alert className="mx-auto">{error}</Alert>}

      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
