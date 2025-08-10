// src/components/CountryCard.jsx
import React from "react";

export default function CountryCard({ country }) {
  // country expected to be an object from API: { country: "India", region, ... }
  return (
    <div style={card}>
      <h3 style={{ margin: "0 0 6px 0" }}>{country.country}</h3>
      <p style={{ margin: 0, fontSize: 13 }}>{country.region || country["region"] || "—"}</p>
      <p style={{ marginTop: 6, fontSize: 12, color: "var(--muted)" }}>{country.name || country["name"] || ""}</p>
    </div>
  );
}

const card = {
  border: "1px solid var(--muted)",
  padding: 12,
  borderRadius: 8,
  minWidth: 160,
  maxWidth: 260,
  background: "var(--card)",
};
