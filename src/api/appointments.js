import axios from "axios";

const addAppointment = async (newAppointment) => {
  return axios
    .post("http://localhost:5000/appointments", newAppointment)
    .then((response) => response);
};

const getAppointments = async () => {
  return axios
    .get("http://localhost:5000/appointments")
    .then((response) => response.data);
};

const deleteAppointment = async (id) => {
  return axios
    .delete(`http://localhost:5000/appointments/${id}`)
    .then((response) => response.status);
};

export { getAppointments, addAppointment, deleteAppointment };
