import axios from "axios";
import config from "../config/config.js";

const axiosInstance = axios.create({
  withCredentials: true,
});

class AuthenticationService {
  registerUser(data) {
    return  axios.post(`${config.serverUrl}/users/register`, data);
  }
  loginUser(data) {
    return axiosInstance.post(`${config.serverUrl}/users/login`, data);
  }
}

const authenticationService = new AuthenticationService();

export default authenticationService;
