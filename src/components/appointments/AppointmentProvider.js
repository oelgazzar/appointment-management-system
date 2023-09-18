import { auth, database } from "../../firebase";
import { onValue, ref, remove, push, child, set, off } from "firebase/database";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../auth/AuthProvider";

export const AppointmentContext = createContext();
export const useAppointments = () => useContext(AppointmentContext);

const addAppointment = async (newAppointment) => {
  const appointmentsRef = ref(database, `appointments/${auth.currentUser.uid}`);
  const id = push(appointmentsRef).key;
  set(child(appointmentsRef, id), newAppointment);
};

const deleteAppointment = async (id) => {
  const appointmentRef = ref(
    database,
    `appointments/${auth.currentUser.uid}/` + id
  );
  try {
    await remove(appointmentRef);
  } catch (err) {
    alert(err);
  }
};

export default function AppointmentProvider(props) {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { loggedIn } = useAuth();

  const clearAppointments = useCallback(() => {
    setAppointments([]);
  }, []);

  useEffect(() => {
    console.log("loggedIn: " + !!loggedIn);
    if (!loggedIn) {
      clearAppointments();
      return;
    }

    const appointmentRef = ref(
      database,
      `appointments/${auth.currentUser.uid}`
    );
    console.log(auth.currentUser.email);
    onValue(appointmentRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data) {
        setAppointments(
          Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        );
      } else {
        clearAppointments();
      }
      setLoading(false);
    });
    return () => off(appointmentRef);
  }, [loggedIn]);

  console.log("appointments: ", appointments);

  return (
    <AppointmentContext.Provider
      value={{
        isLoading,
        appointments,
        addAppointment,
        deleteAppointment,
      }}
    >
      {props && props.children}
    </AppointmentContext.Provider>
  );
}
