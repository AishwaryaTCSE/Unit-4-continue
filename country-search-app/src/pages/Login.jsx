// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, state } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("All fields required");
      return;
    }
    const ok = login(form);
    if (ok) {
      nav(from, { replace: true });
    } else {
      setError(state.error || "Login failed");
    }
  };

  return (
    <div style={page}>
      <h2>Login</h2>
      <form onSubmit={submit} style={formStyle}>
        <input name="email" placeholder="Email" value={form.email} onChange={handle} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handle} />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

const page = { padding: 20 };
const formStyle = { display: "flex", flexDirection: "column", gap: 8, maxWidth: 320 };
