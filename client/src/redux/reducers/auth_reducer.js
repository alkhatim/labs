import { authConstants } from "../constants/auth_constants";

const initialState = {
  user: {},
  isLoggedIn: false,
  isLoading: true,
  role: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_SUCCESS:
    case authConstants.LOAD_SUCCESS:
      return {
        ...state,
        user: { ...action.payload },
        isLoading: false,
        isLoggedIn: true,
        role: action.payload.role,
      };
    case authConstants.LOGIN_FAILURE:
    case authConstants.LOAD_FAILURE:
    case authConstants.LOGOUT:
      return {
        user: {},
        isLoading: false,
        isLoggedIn: false,
        role: "",
      };
    default:
      return state;
  }
};
