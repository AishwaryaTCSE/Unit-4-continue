// src/reducers/authReducer.js
export const initialAuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export function authReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, ...action.payload };
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, user: action.payload, error: null };
    case "LOGIN_ERROR":
      return { ...state, error: action.payload };
    case "LOGOUT":
      return { isAuthenticated: false, user: null, error: null };
    case "SIGNUP_SUCCESS":
      return { ...state, isAuthenticated: true, user: action.payload, error: null };
    default:
      return state;
  }
}
