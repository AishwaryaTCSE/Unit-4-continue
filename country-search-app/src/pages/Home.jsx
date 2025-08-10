// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome</h1>
      <p>This app demonstrates authentication, private routes, search with debounce, pagination & infinite scroll, and theme toggle.</p>
      <Link to="/search">Go to Country Search</Link>
    </div>
  );
}
