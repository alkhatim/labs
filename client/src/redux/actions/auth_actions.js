import { authConstants } from "../constants/auth_constants";
import axios from "axios";
import messages from "../../helpers/messages";

export const loginAction = (auth) => async (dispatch) => {
  try {
    const result = await axios.post("http://localhost:5000/api/v1/auth/login", {
      password: auth.password,
      userName: auth.userName,
    });

    const token = result.data.token;

    if (auth.remember) localStorage.setItem("token", token);
    else localStorage.setItem("tempToken", token);

    localStorage.setItem("userName", result.data.name);

    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      payload: { user: auth.userName, token, role: result.data.role },
    });
  } catch (error) {
    messages.error(error);
    localStorage.removeItem("token");
    dispatch({
      type: authConstants.LOGIN_FAILURE,
    });
  }
};

export const loadUserAction = () => async (dispatch) => {
  localStorage.removeItem("tempToken");
  const token = localStorage.getItem("token");
  if (!token)
    dispatch({
      type: authConstants.LOAD_FAILURE,
    });
  try {
    const result = await axios.get(
      "http://localhost:5000/api/v1/auth/my-account",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({
      type: authConstants.LOAD_SUCCESS,
      payload: { user: result.data.data, role: result.data.data.role },
    });
  } catch (error) {
    messages.error("كلمة المرور او اسم المستخدم خطأ");
    if (
      error.response &&
      (error.response.status === 400 || error.response.status === 401)
    ) {
      localStorage.removeItem("token");
    }
    dispatch({
      type: authConstants.LOAD_FAILURE,
    });
  }
};

export const logOutAction = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("tempToken");
  dispatch({
    type: authConstants.LOGOUT,
  });
};
