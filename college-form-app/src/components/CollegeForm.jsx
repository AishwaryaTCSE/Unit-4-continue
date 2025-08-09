import React, { useReducer, useState } from "react";

const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: "",
      },
    },
    state: "",
    coordinates: { latitude: "", longitude: "" },
  },
  courses_offered: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "update_field":
      return { ...state, [action.field]: action.value };

    case "update_nested_field":
      return {
        ...state,
        [action.parent]: {
          ...state[action.parent],
          [action.field]: action.value,
        },
      };

    case "update_city_field":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            [action.field]: action.value,
          },
        },
      };

    case "update_locality_field":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              [action.field]: action.value,
            },
          },
        },
      };

    case "update_coordinates":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            [action.field]: action.value,
          },
        },
      };

    case "update_courses":
      return { ...state, courses_offered: action.value.split(",") };

    case "reset":
      return initialState;

    default:
      throw new Error("invalid action type");
  }
}

export default function CollegeForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(state);
  };

  return (
    <div style={{ padding: "20px", border: "2px solid black", maxWidth: "500px" }}>
      <h2>College Form</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="College Name"
          value={state.name}
          onChange={(e) => dispatch({ type: "update_field", field: "name", value: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Establishment Year"
          value={state.establishment_year}
          onChange={(e) => dispatch({ type: "update_field", field: "establishment_year", value: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Building"
          value={state.address.building}
          onChange={(e) => dispatch({ type: "update_nested_field", parent: "address", field: "building", value: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Street"
          value={state.address.street}
          onChange={(e) => dispatch({ type: "update_nested_field", parent: "address", field: "street", value: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="City Name"
          value={state.address.city.name}
          onChange={(e) => dispatch({ type: "update_city_field", field: "name", value: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Pincode"
          value={state.address.city.locality.pinCode}
          onChange={(e) => dispatch({ type: "update_locality_field", field: "pinCode", value: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Landmark"
          value={state.address.city.locality.landmark}
          onChange={(e) => dispatch({ type: "update_locality_field", field: "landmark", value: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="State"
          value={state.address.state}
          onChange={(e) => dispatch({ type: "update_nested_field", parent: "address", field: "state", value: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Latitude"
          value={state.address.coordinates.latitude}
          onChange={(e) => dispatch({ type: "update_coordinates", field: "latitude", value: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Longitude"
          value={state.address.coordinates.longitude}
          onChange={(e) => dispatch({ type: "update_coordinates", field: "longitude", value: e.target.value })}
        />
        <br /><br />

        <input
          placeholder="Courses (comma separated)"
          value={state.courses_offered.join(",")}
          onChange={(e) => dispatch({ type: "update_courses", value: e.target.value })}
        />
        <br /><br />

        <button type="submit">Submit</button>
        <button type="button" onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </form>

      {submittedData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Submitted College Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
