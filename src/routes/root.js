import Root from "../components/Root";
import Home from "../components/home/Home";
import Error from "../components/error/Error";
import NewAppointment from "../components/appointments/NewAppointment";
import Login from "../components/auth/Login";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Signup from "../components/auth/Signup";
import Appointments from "../components/appointments/Appointments";
import Profile from "../components/profile/Profile";

const rootRoutes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "appointments/",
        element: (
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        ),
      },
      {
        path: "appointments/new",
        element: (
          <ProtectedRoute>
            <NewAppointment />
          </ProtectedRoute>
        ),
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/signup",
        element: <Signup />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />,
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default rootRoutes;
