import axios from "axios";
import config from "../config/config.js";

const axiosInstance = axios.create({
  withCredentials: true,
});

class PatientService {
  updatePatientProfile(id, data) {
    return axiosInstance.put(`${config.serverUrl}/patient/profile/${id}`, data);
  }

  updateBooking(id) {
    return axiosInstance.put(
      `${config.serverUrl}/patient/profile/booking/${id}`
    );
  }

  getCurrentPatient(id) {
    return axiosInstance.get(`${config.serverUrl}/patient/profile/me/${id}`);
  }

  getPatientAppointments(id) {
    return axiosInstance.get(
      `${config.serverUrl}/patient/profile/appointment/${id}`
    );
  }

  getPatientCompletedAppointments(id) {
    return axiosInstance.get(
      `${config.serverUrl}/patient/profile/completeappointment/${id}`
    );
  }
}

const patientService = new PatientService();

export default patientService;
