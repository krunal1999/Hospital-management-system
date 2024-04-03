import axios from "axios";
import config from "../config/config.js";

const axiosInstance = axios.create({
  withCredentials: true,
});

class BookingService {
  generateSlots(data) {
    return axiosInstance.post(
      `${config.serverUrl}/booking/pre-generate-slots`,
      data
    );
  }
  generateSlotsById(id, data) {
    return axiosInstance.post(
      `${config.serverUrl}/booking/pre-generate-slots/${id}`,
      data
    );
  }

  deleteSlots(data) {
    return axiosInstance.delete(`${config.serverUrl}/booking/delete-slots`, {
      params: data,
    });
  }

  deleteSlotsById(data) {
    return axiosInstance.delete(`${config.serverUrl}/booking/delete-slots/id`, {
      params: data,
    });
  }

  getAvailbleBookingByDrID(id) {
    return axiosInstance.get(`${config.serverUrl}/booking/getslots/${id}`);
  }

  bookedSlotsAll(id) {
    return axiosInstance.get(
      `${config.serverUrl}/booking/getslots/allbooked/${id}`
    );
  }

  bookAppointment(id, data) {
    return axiosInstance.put(
      `${config.serverUrl}/booking/bookappointment/${id}`,
      data
    );
  }
}

const bookingService = new BookingService();

export default bookingService;
