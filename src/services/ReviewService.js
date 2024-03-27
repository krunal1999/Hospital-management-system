import axios from "axios";
import config from "../config/config.js";

const axiosInstance = axios.create({
  withCredentials: true,
});

class ReviewService {
  addReview(id, rating, reviewText) {
    return axiosInstance.post(`${config.serverUrl}/doctor/${id}/reviews`, {
      rating,
      reviewText,
    });
  }

  getAllReview() {
    return axiosInstance.get(`${config.serverUrl}/reviews/`);
  }
}

const reviewService = new ReviewService();

export default reviewService;
