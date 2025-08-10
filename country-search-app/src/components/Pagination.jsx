// src/components/Pagination.jsx
import React from "react";

export default function Pagination({ page, setPage, hasMore }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginTop: 12 }}>
      <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1}>Prev</button>
      <span>Page {page}</span>
      <button onClick={() => setPage(page + 1)} disabled={!hasMore}>Next</button>
    </div>
  );
}
