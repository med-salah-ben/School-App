import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userList.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete"; // Step 1: Import DeleteIcon


const buttonStyle = {
  backgroundColor: "#ff9900",
  color: "#ffffff",
  marginRight: "18px",
};

const deleteButtonStyle = {
  backgroundColor: "#f50057",
  color: "#ffffff",
  marginLeft: "18px",
};

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admins/getAllParentAccounts"
      ); // Replace with the actual API endpoint
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const activateAccount = async (userId) => {
    const formData = {
      parentId: userId,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/admins/activeParentAccount",
        formData
      );
      console.log(response.data);
      fetchUsers(); // Refresh the user list after activating the account
    } catch (error) {
      console.error("Error activating account:", error);
    }
  };

  const deleteUser = async (userId) => {

    const formData = {
      parentId: userId,
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/admins/deleteParentAccount',formData
      );
      console.log(response.data);
      fetchUsers(); // Refresh the user list after deleting the user
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (

    <div className="userList">
      <h1>List of parents account</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="tableHeader">
              <TableCell></TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Is Accepted</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} className="tableRow">
                <TableCell>
                  <AccountCircleIcon />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  {user.isAccepted ? (
                    <CheckCircleIcon style={{ color: "green" }} />
                  ) : (
                    <CancelIcon style={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell>
                <Button
                    variant="contained"
                    style={buttonStyle} // Use the buttonStyle inline style
                    onClick={() => activateAccount(user._id)}
                  >
                    Active
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    style={deleteButtonStyle} // Use the deleteButtonStyle inline style
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

    
  );
}
