import axios from "axios";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASEURL,
  timeout: 2000,
})

export default axiosConfig;