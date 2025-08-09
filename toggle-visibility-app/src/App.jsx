import React, { useReducer } from "react";
const initialState = { isVisible: false };
const visibilityReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return { isVisible: !state.isVisible };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(visibilityReducer, initialState);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={() => dispatch({ type: "TOGGLE_VISIBILITY" })}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Toggle Message
      </button>
      {state.isVisible && <h2 style={{ marginTop: "20px" }}>Hello, World!</h2>}
    </div>
  );
}

export default App;
