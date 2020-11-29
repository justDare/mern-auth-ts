import axios from "axios";
import * as actionTypes from "./actionTypes";

export const loadUser = (): any => (dispatch: Function, getState: Function) => {
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: actionTypes.USER_LOADED,
        user: res.data,
      })
    )
    .catch((err) => {
      dispatch({ type: actionTypes.AUTH_ERROR });
    });
};

export const logout = (): any => (dispatch: Function) => {
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS,
  });
};

export const login = (loginInfo: { email: string; password: string }): any => (
  dispatch: Function,
  getState: Function
) => {
  const body = JSON.stringify(loginInfo);

  axios
    .post("/api/auth", body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        user: res.data.user,
        token: res.data.token,
      })
    )
    .catch((err) => {
      dispatch({ type: actionTypes.LOGIN_FAIL });
    });
};

export const register = (registerInfo: {
  email: string;
  user_name: string;
  password: string;
  confirm_password: string;
}): any => (dispatch: Function, getState: Function) => {
  const body = JSON.stringify(registerInfo);

  axios
    .post("/api/auth/user", body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        user: res.data.user,
        token: res.data.token,
      })
    )
    .catch((err) => {
      dispatch({ type: actionTypes.REGISTER_FAIL });
    });
};

export const clearMsg = (): any => (dispatch: Function) => {
  dispatch({
    type: actionTypes.CLEAR_AUTH_MSG,
  });
};

// Setup config/headers and token
export const tokenConfig = (getState: Function) => {
  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config: config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
