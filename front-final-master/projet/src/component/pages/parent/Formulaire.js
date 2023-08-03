import React, { useState } from "react";
import "./formulaire.css";
import Form from "react-bootstrap/Form";
import axios from "axios";

function Formulaire() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    age: "",
    email: "",
  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/parents/register/student", formData);
      console.log(response);
      // Add any additional logic for success here, e.g., showing a success message to the user.
    } catch (error) {
      console.error("Error registering:", error);
      // Add any error handling here, e.g., showing an error message to the user.
    }
  };

  return (
    <>
      <span className="FormTitle">Register your children </span>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              name="nom"
              placeholder="Student first name"
              required
              onChange={handleChange}
            />
            <span></span>
          </label>

          <label>
            <input
              className="input"
              type="text"
              name="prenom"
              placeholder="Student last name"
              required
              onChange={handleChange}
            />
            <span> </span>
          </label>
        </div>

        <label>
          <input
            className="input"
            type="text"
            name="email"
            placeholder="Parent Email"
            required
            onChange={handleChange}
          />
          <span></span>
        </label>

        <label>
          <input
            className="input"
            placeholder="Student age"
            type="tel"
            name="age"
            required
            onChange={handleChange}
          />
          <span></span>
        </label>

        <Form.Select
          aria-label="Default select example"
          className="option"
          name="studentClass"
          onChange={handleChange}
        >
          <option>Class</option>
          <option value="1">First grade</option>
          <option value="2">Second grade</option>
          <option value="3">Third grade</option>
        </Form.Select>

        <button type="submit" className="fancy">
          <span className="text">Register</span>
        </button>
      </form>
    </>
  );
}

export default Formulaire;
