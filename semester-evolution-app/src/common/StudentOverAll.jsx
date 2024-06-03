import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  MenuItem,
  Select,
  Grid,
  Container,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { overallResult } from "../service/ServiceComponent";

const ModalComponent = ({
  studentId,
  studentName,
  studentEmail,
  handleCloseModal,
}) => {
  const [result, setResult] = useState("");
  let [desc, setDesc] = useState();
  console.log(result);

  useEffect(() => {
    axios
      .get(`http://localhost:1100/admin/getResult?stuId=${studentId}`)

      .then((response) => {
        console.log(response.data + "console");
        setResult(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    try {
      overallResult(studentId).then((resp) => {
        console.log(resp);
        setDesc(resp.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [studentId]);

  return (
    <Modal
      open={true}
      onClose={handleCloseModal}
      style={{
        height: "400px",
        width: "700px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* <Transition in={true} timeout={500}> */}
      <Paper
        elevation={3}
        style={{
          padding: 24,
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          position: "absolute",
        }}
      >
        <article className="container d-flex flex-column justify-content-center">
          <h2 className="text-center">Result</h2>
          <main className="p-3 container d-block w-50">
            <div>
              <p>
                <span className="fw-bold">Student ID:</span> KCET800
                {studentId}
              </p>
            </div>
            <div>
              <p>
                <span className="fw-bold">Student Name: </span>
                {studentName}
              </p>
            </div>
            <div>
              <p>
                <span className="fw-bold">Student Email: </span>
                {studentEmail}
              </p>
            </div>
            <div>
              <p>
                <span className="fw-bold">Over Result: </span>
                <span
                  style={{
                    color:
                      desc === "Student passed keep growing up"
                        ? "green"
                        : "red",
                  }}
                >
                  {console.log(result === "Student passed keep growing up")}
                  {desc === "Student passed keep growing up"
                    ? "Pass "
                    : desc === "[Subject Not assigned yet]"
                    ? "Subject Not Assigned"
                    : "Fail " + desc}
                </span>
              </p>
            </div>
          </main>
          {/* Add your custom modal content here */}
        </article>
        <Button
          className="float-end"
          variant="contained"
          color="primary"
          onClick={handleCloseModal}
        >
          Close
        </Button>
      </Paper>
      {/* </Transition> */}
    </Modal>
  );
};

const StudentSelector = () => {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:1100/admin/getStudents")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = () => {
    console.log(selectedId);
    console.log(selectedStudent);
    if (selectedId > 0) {
      setShowModal(true);
    }
  };

  const handleStudentChange = (event) => {
    setSelectedId(event.target.value);
    setSelectedStudent(
      students.find((student) => student.stuMapId === event.target.value)
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} style={{ padding: 24, width: "100%" }}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Typography
              variant="h5"
              component="h2"
              className="fw-semibold mb-3"
            >
              Get OverAll Result
            </Typography>
            <InputLabel id="student-label" className="fw-semibold">
              Select a student
            </InputLabel>
            <Select
              value={selectedId}
              onChange={handleStudentChange}
              fullWidth
              style={{ width: 300 }}
            >
              <MenuItem value={0}>Select a student</MenuItem>
              {students.map((student) => (
                <MenuItem key={student.stuMapId} value={student.stuMapId}>
                  {student.stuMapId +
                    "  -  " +
                    student.studentProfile.studentName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {showModal && (
        <ModalComponent
          studentId={selectedStudent.stuMapId}
          studentName={selectedStudent.studentProfile.studentName}
          studentEmail={selectedStudent.studentProfile.studentEmail}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default StudentSelector;
