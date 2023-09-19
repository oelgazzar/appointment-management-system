import Progress from "../Progress";
import Appointment from "./Appointment";
import { useAppointments } from "./AppointmentProvider";

export default function AppointmentList() {
  const { isLoading, appointments, deleteAppointment } = useAppointments();

  if (isLoading) {
    return <Progress />;
  }

  return appointments && appointments.length > 0 ? (
    <div className="row row-cols-2">
      {appointments.map((a, i) => {
        return (
          <div className="col" key={a.id}>
            <Appointment
              a={a}
              onDeleteAppointment={() => deleteAppointment(a.id)}
            />
          </div>
        );
      })}
    </div>
  ) : (
    <p className="text-center">No Appointments</p>
  );
}
