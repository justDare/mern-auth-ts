import * as actionTypes from "actions/actionTypes";

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthed: false,
  msg: "",
};

const reducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      if (action.token !== undefined)
        localStorage.setItem("token", action.token);
      return {
        ...state,
        isAuthed: true,
        user: action.user || null,
      };
    case actionTypes.USER_LOADED:
      return {
        ...state,
        isAuthed: true,
        user: action.user || null,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        msg: "Login failed.",
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        msg: "Register failed.",
      };
    case actionTypes.AUTH_ERROR:
    case actionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthed: false,
        token: null,
        user: null,
      };
    case actionTypes.CLEAR_AUTH_MSG:
      return {
        ...state,
        msg: "",
      };
  }
  return state;
};

export default reducer;
