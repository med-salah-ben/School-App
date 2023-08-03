import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./register.css";

const BASE_API_URL = "http://localhost:8080/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    userType: "Parent",
  });

  const [titleModal, setTitleModal] = useState("");
  const [bodyModal, setBodyModal] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiEndpoint =
        formData.userType === "Parent"
          ? `${BASE_API_URL}/parents/register`
          : `${BASE_API_URL}/professors/register`;

      const response = await axios.post(apiEndpoint, formData);
      console.log(response.data); // Assuming the response contains data returned from the server

      if (response.data.message === "account created successfully") {
        handleOpen();
        if (formData.userType === "Parent") {
          setTitleModal("Account Created Successfully");
          setBodyModal(
            "Your account has been created successfully. However, you will need to wait for the admin to approve your account before you can log in to the platform."
          );
        } else {
        }
      } 
      // Clear the form after successful registration
      setFormData({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        userType: "Parent",
      });
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.log("Error:", error);
      handleOpen();
        setTitleModal("An error occurred");
        setBodyModal(
          "Username or email is already used. Please choose a different one."
        );
    }
  };

  return (
    <>
      <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter your username..."
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter your email..."
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            placeholder="Enter your password..."
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label>Phone Number</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Enter your Phone Number..."
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <div className="box">
            <select
              value={formData.userType}
              onChange={handleChange}
              name="userType"
            >
              <option value="Parent">Parent</option>
              <option value="Professor">Professor</option>
            </select>
          </div>
          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {titleModal}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {bodyModal}
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}
