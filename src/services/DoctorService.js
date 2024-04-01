import axios from "axios";
import config from "../config/config.js";

const axiosInstance = axios.create({
  withCredentials: true,
});

class DoctorService {
  updateDoctorProfile(id, data) {
    return axiosInstance.put(`${config.serverUrl}/doctor/profile/${id}`, data);
  }
  getCurrentDoctor(id) {
    return axiosInstance.get(`${config.serverUrl}/doctor/profile/me/${id}`);
  }

  getDoctorById(id) {
    return axiosInstance.get(`${config.serverUrl}/doctor/${id}`);
  }

  getAllDoctor(query) {
    return axiosInstance.get(`${config.serverUrl}/doctor?query=${query}`);
  }

  getDoctortAppointments(id) {
    return axiosInstance.get(
      `${config.serverUrl}/doctor/profile/appointment/${id}`
    );
  }

  givePrescription(data) {
    return axiosInstance.post(
      `${config.serverUrl}/doctor/profile/prescription`,
      data
    );
  }

  getAllPrescription() {
    return axiosInstance.get(
      `${config.serverUrl}/doctor/profile/getallprescription`
    );
  }

  updatePrescriptionById(id) {
    return axiosInstance.put(
      `${config.serverUrl}/doctor/profile/updateprescriptionbyid/${id}`
    );
  }

  getAllDoctor() {
    return axiosInstance.get(`${config.serverUrl}/doctor/`);
  }

  updateDoctorApprove(id) {
    return axiosInstance.put(`${config.serverUrl}/doctor/updateapprove/${id}`);
  }

  updateDoctorAvailable(id) {
    return axiosInstance.put(
      `${config.serverUrl}/doctor/updateavailable/${id}`
    );
  }
}

const doctoreService = new DoctorService();

export default doctoreService;
