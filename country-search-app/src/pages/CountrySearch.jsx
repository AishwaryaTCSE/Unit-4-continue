// src/pages/CountrySearch.jsx
import React, { useEffect, useReducer, useRef, useCallback } from "react";
import axios from "axios";
import { countryReducer, initialCountryState } from "../reducers/countryReducer";
import CountryCard from "../components/CountryCard";
import Pagination from "../components/Pagination";

// Debounce hook
function useDebounce(value, delay = 500) {
  const ref = useRef();
  useEffect(() => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {}, 0);
    return () => clearTimeout(ref.current);
  }, [value, delay]);
  const [debounced, setDebounced] = React.useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function CountrySearch() {
  const [state, dispatch] = useReducer(countryReducer, initialCountryState);
  const debounced = useDebounce(state.searchTerm, 450);
  const observerRef = useRef();

  const fetchCountries = useCallback(
    async ({ replace = false } = {}) => {
      dispatch({ type: "FETCH_START" });
      try {
        // The API returns object keyed by country iso. We'll transform to array and filter by search term.
        const res = await axios.get("https://api.first.org/data/v1/countries");
        const dataObj = res.data?.data || {};
        let arr = Object.keys(dataObj).map((code) => ({ code, ...dataObj[code] }));
        // optional simple search: match name or country
        if (debounced && debounced.trim()) {
          const q = debounced.toLowerCase();
          arr = arr.filter(
            (c) =>
              (c.country && c.country.toLowerCase().includes(q)) ||
              (c.name && c.name.toLowerCase().includes(q)) ||
              (c.region && c.region.toLowerCase().includes(q))
          );
        }
        // pagination/infinite logic
        const start = (state.page - 1) * state.limit;
        const paged = arr.slice(start, start + state.limit);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { items: paged, hasMore: start + state.limit < arr.length, replace },
        });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: "Failed to load countries" });
      }
    },
    [state.page, state.limit, debounced]
  );

  // initial & when debounced/search/page changes
  useEffect(() => {
    // when search term changes we want to replace items
    fetchCountries({ replace: state.page === 1 });
  }, [debounced, state.page, fetchCountries]);

  // infinite scroll observer
  useEffect(() => {
    if (state.mode !== "infinite") return;
    if (!observerRef.current) observerRef.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && !state.loading && state.hasMore) {
        dispatch({ type: "SET_PAGE", payload: state.page + 1 });
      }
    });
    const current = document.querySelector("#scroll-anchor");
    if (current) observerRef.current.observe(current);
    return () => {
      if (current && observerRef.current) observerRef.current.unobserve(current);
    };
  }, [state.mode, state.page, state.loading, state.hasMore]);

  const onSetPage = (p) => dispatch({ type: "SET_PAGE", payload: p });
  const onSearch = (e) => dispatch({ type: "SET_SEARCH", payload: e.target.value });
  const onToggle = (m) => dispatch({ type: "TOGGLE_MODE", payload: m });

  return (
    <div style={{ padding: 18 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input placeholder="Search countries..." value={state.searchTerm} onChange={onSearch} style={{ flex: 1 }} />
        <button onClick={() => onToggle(state.mode === "pagination" ? "infinite" : "pagination")}>
          {state.mode === "pagination" ? "Infinite" : "Pagination"}
        </button>
      </div>

      {state.error && <div style={{ color: "red" }}>{state.error}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 }}>
        {state.items.map((c) => (
          <CountryCard key={c.code || c.country} country={c} />
        ))}
      </div>

      {state.loading && <p>Loading...</p>}

      {state.mode === "pagination" && (
        <Pagination page={state.page} setPage={onSetPage} hasMore={state.hasMore} />
      )}

      {/* anchor for infinite scroll */}
      {state.mode === "infinite" && <div id="scroll-anchor" style={{ height: 1 }} />}

      {!state.loading && state.items.length === 0 && <div style={{ marginTop: 12 }}>No results</div>}
    </div>
  );
}
