// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ onToggleMode, mode }) {
  const { state, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={brand}>CountryApp</Link>
      </div>
      <div style={right}>
        <button onClick={() => onToggleMode(mode === "pagination" ? "infinite" : "pagination")} style={btn}>
          {mode === "pagination" ? "Switch to Infinite" : "Switch to Pagination"}
        </button>
        <button onClick={toggleTheme} style={btn}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
        {state.isAuthenticated ? (
          <>
            <span style={{ margin: "0 8px" }}>{state.user?.name}</span>
            <button onClick={handleLogout} style={btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={link}>Login</Link>
            <Link to="/signup" style={link}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 16px",
  borderBottom: "1px solid var(--muted)",
  gap: 12,
};

const brand = { fontWeight: 700, fontSize: 18, textDecoration: "none", color: "var(--text)" };
const right = { display: "flex", alignItems: "center", gap: 8 };
const btn = { padding: "6px 10px", cursor: "pointer" };
const link = { marginLeft: 8, textDecoration: "none", color: "var(--text)" };
