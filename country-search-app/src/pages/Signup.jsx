// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup, state } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("All fields required");
      return;
    }
    const ok = signup(form);
    if (ok) {
      nav("/");
    } else {
      setError(state.error || "Signup failed");
    }
  };

  return (
    <div style={page}>
      <h2>Signup</h2>
      <form onSubmit={submit} style={formStyle}>
        <input name="name" placeholder="Name" value={form.name} onChange={handle} />
        <input name="email" placeholder="Email" value={form.email} onChange={handle} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handle} />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

const page = { padding: 20 };
const formStyle = { display: "flex", flexDirection: "column", gap: 8, maxWidth: 320 };
