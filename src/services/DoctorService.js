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
}

const doctoreService = new DoctorService();

export default doctoreService;
