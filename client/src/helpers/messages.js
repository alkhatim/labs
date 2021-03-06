import { toast } from "react-toastify";

const error = (error) => {
  if (typeof error === "string"){
    toast.error(error, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });}

    if (typeof error === "object") {
      for (let key in error) {
        toast.error(error[key], {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
        });
      }
    };

  if (error.response && error.response.status < 500)
    {toast.error(error.response.data.error, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });};
};

const warn = (message) => {
  toast.warn(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000,
  });
};

const info = (message) => {
  toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000,
  });
};

const success = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000,
  });
};

export default {
  error,
  warn,
  info,
  success,
};
