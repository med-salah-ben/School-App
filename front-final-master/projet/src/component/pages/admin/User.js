import "./user.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Select, // Import Select from Material-UI
  MenuItem,
  selectClasses, // Import MenuItem from Material-UI
} from "@mui/material";

export default function User() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedClass, setSelectedClass] = useState(""); // State to hold the selected class
  const [open, setOpen] = React.useState(false);
  const [studentClasses, setStudentClasses] = useState([]); // State to hold the classes of the selected student

  const handleClickOpen = (student) => {
    // Set the selected student and open the modal
    setSelectedStudent(student);
    setOpen(true);

    // Replace 'apiEndpoint' with the actual API endpoint that provides student classes
    const apiEndpoint = `http://localhost:8080/api/admins/findAllClasse`;

    // Fetch the classes for the selected student
    axios
      .get(apiEndpoint)
      .then((response) => setStudentClasses(response.data))
      .catch((error) => console.error(error));
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Replace 'apiEndpoint' with the actual API endpoint that provides student data
  const apiEndpoint = "http://localhost:8080/api/admins/findAllStudends";

  useEffect(() => {
    // Fetch data from API using Axios
    axios
      .get(apiEndpoint)
      .then((response) => setStudents(response.data))
      .catch((error) => console.error(error));
  }, []);



  const handleSelectClasses = (student) => {
    handleClickOpen(student);
  };



  const saveClasseForStudent = async () => {

    const studentId = selectedStudent._id;
    const classeId = selectedClass._id;
    
    const formData = {
      studentId: studentId,
      classId: classeId,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/admins/addStudendToClasse",
        formData
      );
      console.log(response.data);

      handleClose();
   
    } catch (error) {
      console.error("Error:", error);
    }
  };


  

  return (
    <div className="user">
      <div className="userUpdate">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.nom}</TableCell>
                  <TableCell>{student.prenom}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleSelectClasses(student)} // Pass the student object to the click handler
                    >
                      Select Classes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Select Classes</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)} // Update the selectedClass state when an item is selected
            >
              {studentClasses.map((classItem) => (
                <MenuItem key={classItem.id} value={classItem}>
                  {classItem.name}
                </MenuItem>
              ))}
            </Select>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveClasseForStudent} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
