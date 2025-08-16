import React from "react";
import useForm from "../hooks/useForm";

const FormComponent = () => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${values.name}, Email: ${values.email}`);
    resetForm(); 
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Custom Hook Form Example</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Submit
        </button>
        <button
          type="button"
          onClick={resetForm}
          style={{ marginLeft: "10px", marginTop: "10px" }}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
