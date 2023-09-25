import { fireEvent, render, screen } from "@testing-library/react";
import Appointment from "../Appointment";
import AppointmentModel from "../../../models/AppointmentModel";
import "bootstrap/dist/js/bootstrap.bundle";

const a = new AppointmentModel({
  id: "one",
  status: "pending",
  reasonForVisit: "follow up",
  date: "2023-10-01",
  time: "17:00",
});

describe("Single Appointment", () => {
  it("should render appointment's reasonForVisit", () => {
    render(<Appointment a={a} onDeleteAppointment={jest.fn()} />);

    const element = screen.getByText(/follow up/i);
    expect(element).toBeInTheDocument();
  });

  it("should render appointment's date and time", () => {
    render(<Appointment a={a} onDeleteAppointment={jest.fn()} />);

    const dayOfMonth = screen.getByText(/1 oct/i);
    const dayOfWeek = screen.getByText(/sunday/i);
    const time = screen.getByText(/05:00 pm/i);
    expect(dayOfMonth).toBeInTheDocument();
    expect(dayOfWeek).toBeInTheDocument();
    expect(time).toBeInTheDocument();
  });

  it("should render a hidden delete button", () => {
    render(<Appointment a={a} onDeleteAppointment={jest.fn()} />);

    const deleteButton = screen.getByTestId("delete-button");
    expect(deleteButton).toHaveClass("opacity-0");
  });

  it("should show delete button on hover", () => {
    render(<Appointment a={a} onDeleteAppointment={jest.fn()} />);

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.mouseOver(deleteButton);
    expect(deleteButton).not.toHaveClass("opacity-0");
  });

  it("should render modal when delete button clicked", () => {
    render(<Appointment a={a} onDeleteAppointment={jest.fn()} />);

    const deleteButton = screen.getByTestId("delete-button");
    const modal = screen.getByTestId("delete-modal");
    expect(modal).not.toHaveClass("show");
    fireEvent.click(deleteButton);
    expect(modal).toHaveClass("show");
  });

  it("should render status badge with the correct color", () => {
    render(<Appointment a={a} onDeleteAppointment={jest.fn()} />);

    const statusBadge = screen.getByText("pending");
    expect(statusBadge).toHaveClass("bg-warning");
  });
});
