/* eslint-disable react-hooks/exhaustive-deps */
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
import AppointmentModel from "../../models/AppointmentModel";

export const AppointmentContext = createContext();
export const useAppointments = () => useContext(AppointmentContext);

const addAppointment = async (newAppointment) => {
  const appointmentsRef = ref(database, `appointments/${auth.currentUser.uid}`);
  const id = push(appointmentsRef).key;
  newAppointment.id = id;
  set(child(appointmentsRef, id), newAppointment.toObject());
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
    if (!loggedIn) {
      clearAppointments();
      return;
    }

    const appointmentRef = ref(
      database,
      `appointments/${auth.currentUser.uid}`
    );
    onValue(appointmentRef, (snapshot) => {
      if (snapshot.exists()) {
        setAppointments(AppointmentModel.fromSnapshot(snapshot.val()));
      } else {
        clearAppointments();
      }
      setLoading(false);
    });
    return () => off(appointmentRef);
  }, [loggedIn]);

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
