import axios from "axios";
import { toast } from "react-toastify";

const token =
  localStorage.getItem("token") || localStorage.getItem("tempToken");

const http = axios.create({
  headers: { Authorization: `Bearer ${token}` },
});

const defaultHeader = () => {
  http.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

http.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("Somthing failed on the server! Try again later", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
  }
  return Promise.reject(error);
});

export default {
  defaultHeader,
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
};
