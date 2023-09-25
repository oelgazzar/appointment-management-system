import { Outlet, RouterProvider, createMemoryRouter } from "react-router";
import { screen, render, fireEvent } from "@testing-library/react";
import Login from "../Login";
import ErrorProvider, { useError } from "../../error/ErrorProvider";

import { useAuth } from "../AuthProvider";
import { signInWithEmailAndPassword } from "firebase/auth";

jest.mock("../AuthProvider");
jest.mock("firebase/auth");

const FakeHome = () => {
  return <p>Home page</p>;
};

const FakeRoot = () => {
  const [error] = useError();
  return (
    <>
      <Outlet />
      <p>{error}</p>
    </>
  );
};

const FakeRouter = () => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <FakeRoot />,
        children: [
          {
            path: "",
            element: <FakeHome />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ],
    {
      initialEntries: ["/login"],
    }
  );

  return (
    <ErrorProvider>
      <RouterProvider router={router} />;
    </ErrorProvider>
  );
};

describe("Login", () => {
  it("should redirect to home page when logged in", async () => {
    useAuth.mockReturnValue({ loggedIn: true });

    render(<FakeRouter />);

    const paragraphElement = screen.getByText(/home page/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  it("should display error message when loggin in fails", async () => {
    useAuth.mockReturnValue({ loggedIn: false });
    signInWithEmailAndPassword.mockRejectedValue(
      new Error("invalid email or password")
    );

    render(<FakeRouter />);

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText(/invalid email or password/);
    expect(errorMessage).toBeInTheDocument();
  });
});
