import axios from "axios";
import config from "../config/config.js";

const axiosInstance = axios.create({
  withCredentials: true,
});

class BookingService {
  getAvailbleBookingByDrID(id) {
    return axiosInstance.get(`${config.serverUrl}/booking/getslots/${id}`);
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
