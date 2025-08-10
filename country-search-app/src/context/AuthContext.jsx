// src/context/AuthContext.jsx
import React, { createContext, useReducer, useContext, useEffect } from "react";
import { authReducer, initialAuthState } from "../reducers/authReducer";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    // load from localStorage if present
    try {
      const raw = localStorage.getItem("auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: "INIT", payload: parsed });
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    // persist minimal auth state
    localStorage.setItem("auth", JSON.stringify({ isAuthenticated: state.isAuthenticated, user: state.user }));
  }, [state.isAuthenticated, state.user]);

  const signup = ({ name, email, password }) => {
    // For this project, signup will just store user in localStorage "users" list.
    try {
      const usersRaw = localStorage.getItem("users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      if (users.find((u) => u.email === email)) {
        dispatch({ type: "LOGIN_ERROR", payload: "Email already registered" });
        return false;
      }
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      dispatch({ type: "SIGNUP_SUCCESS", payload: { name, email } });
      return true;
    } catch (e) {
      dispatch({ type: "LOGIN_ERROR", payload: "Signup failed" });
      return false;
    }
  };

  const login = ({ email, password }) => {
    try {
      const usersRaw = localStorage.getItem("users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        dispatch({ type: "LOGIN_ERROR", payload: "Invalid credentials" });
        return false;
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: { name: user.name, email: user.email } });
      return true;
    } catch (e) {
      dispatch({ type: "LOGIN_ERROR", payload: "Login failed" });
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
