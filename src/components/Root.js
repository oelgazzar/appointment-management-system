import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Progress from "./Progress";

import { useAuth } from "./auth/AuthProvider";

export default function Root() {
  const { isAuthStateReady } = useAuth();
  if (!isAuthStateReady) {
    return <Progress />;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
}
