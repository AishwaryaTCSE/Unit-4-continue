// src/reducers/countryReducer.js
export const initialCountryState = {
  items: [],        // currently displayed items
  allData: [],      // raw API data (if needed)
  loading: false,
  error: null,
  page: 1,
  limit: 12,
  hasMore: true,
  searchTerm: "",
  mode: "pagination", // or "infinite"
};

export function countryReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      // payload: { items, replace }
      const items = action.payload.replace ? action.payload.items : [...state.items, ...action.payload.items];
      return {
        ...state,
        loading: false,
        items,
        hasMore: action.payload.hasMore,
        error: null,
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload, page: 1, items: [] };
    case "TOGGLE_MODE":
      return { ...state, mode: action.payload, page: 1, items: [] };
    case "RESET":
      return { ...initialCountryState, mode: state.mode };
    default:
      return state;
  }
}
