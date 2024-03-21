import axios from "axios";
import config from "../config/config.js";

class AuthenticationService {
  registerUser(data) {
    return axios.post(`${config.serverUrl}/users/register`, data);
  }
}

const authenticationService = new AuthenticationService();

export default authenticationService;
