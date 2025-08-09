import React, { useReducer, useState } from "react";
const initialState = {
  email: "",
  password: "",
  submitted: false
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "submit":
      return { ...state, submitted: true };
    case "reset":
      return initialState;
    default:
      throw new Error("invalid action type");
  }
};

function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.email && state.password) {
      dispatch({ type: "submit" });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <input
            type="email"
            placeholder="Enter Email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
            required
            style={{ padding: "8px", margin: "5px" }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter Password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
            required
            style={{ padding: "8px", margin: "5px" }}
          />
        </div>
        <div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              marginRight: "5px",
              cursor: "pointer"
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "reset" })}
            style={{
              padding: "10px 20px",
              background: "red",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {}
      {!state.submitted ? (
        <div>No details found</div>
      ) : (
        <div>
          <div>User Email: {state.email}</div>
          <div>User Password: {state.password}</div>
        </div>
      )}
    </div>
  );
}

export default App;
