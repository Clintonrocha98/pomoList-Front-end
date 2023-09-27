import axios from "axios";

const url = "https://pomo-list-back-end.vercel.app";

const axiosApi = axios.create({
  baseURL: url,
});

export default axiosApi;
