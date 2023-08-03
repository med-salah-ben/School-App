import "./login.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userType: "Parent",
  });

  const [open, setOpen] = React.useState(false);

  const [titleModal, setTitleModal] = useState("");
  const [bodyModal, setBodyModal] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };




  const handleSubmit = (e) => {
    e.preventDefault();
  
    const apiEndpoint =
      formData.userType === "Parent"
        ? `http://localhost:8080/api/parents/login`
        : formData.userType === "Admin"
        ? `http://localhost:8080/api/admins/login`
        : `http://localhost:8080/api/professors/login`;
  
    // Make a request to the login API
    axios.post(apiEndpoint, formData)
      .then((response) => {
        console.log("testazaze" , response.data.message);
  
        if (response.data.message === 'sucess login') {
          handleOpen();
          setTitleModal("Login Successful");
          setBodyModal("Welcome! You have successfully logged in.");
          // Assuming the server returns a success status code (e.g., 200) upon successful login
          const { userType } = formData;
          console.log("data : " , userType)

          switch (userType) {
            case "Parent":
              navigate("/parent"); // Redirect to the parent dashboard
              break;
            case "Professor":
              navigate("/professor"); // Redirect to the professor dashboard
              break;
            case "Admin":
              navigate("/admin"); // Redirect to the admin dashboard
              break;
            default:
              // Handle other user types or scenarios as needed
              break;
          }
        } else {
          // Handle login error here, if needed
        }
      })
      .catch((error) => {
        // Handle API request error here, if needed

       
          handleOpen();
          setTitleModal("Account Not Activated");
          setBodyModal(
            "Your account is not active. Please wait for admin approval."
          );
         
      });
  };
  

  return (
    <>
      <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Enter your username..."
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Enter your password..."
            name="password"
            value={formData.password}
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
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="loginButton">
            Login
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
