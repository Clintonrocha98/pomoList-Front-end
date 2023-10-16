import axios from "axios";
import { getCookie } from "cookies-next";

const token = getCookie("pomolist-token");
const url = "https://pomo-list-back-end.vercel.app";
// const url = "http://localhost:3333";
const axiosApi = axios.create({
  baseURL: url,
});

if (token) {
  axiosApi.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export default axiosApi;
