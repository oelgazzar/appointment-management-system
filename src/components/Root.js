import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Progress from "./Progress";
import Main from "./Main";

import { useAuth } from "./auth/AuthProvider";
import Footer from "./Footer";
import Alert from "./Alert";
import { useError } from "./error/ErrorProvider";

export default function Root() {
  const { isAuthStateReady, loggedIn } = useAuth();
  const [error] = useError();

  if (!isAuthStateReady) {
    return <Progress />;
  }

  return (
    <div className="d-flex flex-column vh-100">
      {error && <Alert className="mx-auto">{error}</Alert>}
      <Navbar />
      {loggedIn ? (
        <Main>
          <Outlet />
        </Main>
      ) : (
        <>
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
}
