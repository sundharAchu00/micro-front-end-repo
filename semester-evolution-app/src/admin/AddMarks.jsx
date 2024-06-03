import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMarksModal = ({ open, onClose, stuId, subId, handlePostModel }) => {
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [internalMarks, setInternalMarks] = useState(0);
  const [externalMarks, setExternalMarks] = useState(0);
  const [attendancePercentageError, setAttendancePercentageError] =
    useState("");
  const [internalMarksError, setInternalMarksError] = useState("");
  const [externalMarksError, setExternalMarksError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(attendancePercentage);
    let error = false;
    if (attendancePercentage <= 0 || attendancePercentage > 100) {
      setAttendancePercentageError(
        "Attendance percentage must be between 0 and 100"
      );
      error = true;
    } else {
      setAttendancePercentageError("");
    }
    if (internalMarks <= 0 || internalMarks > 100) {
      setInternalMarksError("Internal marks must be between 0 and 100");
      error = true;
    } else {
      setInternalMarksError("");
    }
    if (externalMarks <= 0 || externalMarks > 100) {
      setExternalMarksError("External marks must be between 0 and 100");
      error = true;
    } else {
      setExternalMarksError("");
    }
    if (!error) {
      try {
        // Add your logic to update marks here
        console.log("Updating marks...");
        handlePostModel(
          stuId,
          subId,
          attendancePercentage,
          internalMarks,
          externalMarks
        );
        setAttendancePercentage(0);
        setInternalMarks(0);
        setExternalMarks(0);
        // toast.success("")
        onClose();
      } catch (error) {
        console.error("Error updating marks:", error);
      }
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name === "attendancePercentage") {
      if (value <= 0 || value > 100) {
        setAttendancePercentageError(
          "Attendance percentage must be between 0 and 100"
        );
      } else {
        setAttendancePercentageError("");
      }
    } else if (name === "internalMarks") {
      if (value <= 0 || value > 100) {
        setInternalMarksError("Internal marks must be between 0 and 100");
      } else {
        setInternalMarksError("");
      }
    } else if (name === "externalMarks") {
      if (value <= 0 || value > 100) {
        setExternalMarksError("External marks must be between 0 and 100");
      } else {
        setExternalMarksError("");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    if (name === "attendancePercentage") {
      setAttendancePercentage(value);
    } else if (name === "internalMarks") {
      setInternalMarks(value);
    } else if (name === "externalMarks") {
      setExternalMarks(value);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          //   border: "2px solid #000",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Marks
        </Typography>
        <div id="modal-modal-description" sx={{ mt: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <TextField
                  label="Attendance Percentage"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  sx={{ width: "300px", marginBottom: "10px" }}
                  value={attendancePercentage}
                  name="attendancePercentage"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={attendancePercentageError !== ""}
                  helperText={attendancePercentageError}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Internal Marks"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  sx={{ width: "300px", marginBottom: "10px" }}
                  value={internalMarks}
                  name="internalMarks"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={internalMarksError !== ""}
                  helperText={internalMarksError}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="External Marks"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  sx={{ width: "300px", marginBottom: "10px" }}
                  value={externalMarks}
                  name="externalMarks"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={externalMarksError !== ""}
                  helperText={externalMarksError}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Update Marks
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

const AddMarks = ({ user }) => {
  const [sId, setSid] = useState(0);
  const [studId, setStudId] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSubId, setSelectedSubId] = useState(0);

  let attendance = 0;

  let marks = {
    internalPercentage: 0,
    externalPercentage: 0,
  };

  const fetchStudentIds = async () => {
    try {
      const response = await axios.get("http://localhost:1100/admin/studIds");
      setStudId(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching student IDs:", error);
      return [];
    }
  };

  const fetchSubjects = async (studId) => {
    let response = [];
    try {
      response = await axios
        .get(`http://localhost:1100/admin/get/student/subjects?stuId=${studId}`)
        .then((resp) => {
          console.log(resp.data);
          setSubjects(resp.data);
        });
      console.log(response.data);
      setSubjects(response.data);
      return response.data;
    } catch (error) {
      if (response === undefined) {
        console.log("found undefined");
      } else {
        setSubjects([]);
      }
      // setSubjects(response.data);
      console.error("Error fetching subjects:", response);
      return [];
    }
  };

  useEffect(() => {
    fetchStudentIds();
  }, []);

  const handleStudenIdChange = (event) => {
    let value = parseInt(event.target.value);
    setSid(value);
    return value > 0 ? fetchSubjects(value) : 0;
  };

  const handlePostModel = async (
    stuId,
    subId,
    attendancePercentage,
    internalMarks,
    externalMarks
  ) => {
    // setMarks({
    //   ...marks,
    //   internalPercentage: parseInt(internalMarks),
    //   externalPercentage: parseInt(externalMarks),
    // });
    marks.internalPercentage = parseInt(internalMarks);
    marks.externalPercentage = parseInt(externalMarks);
    attendance = parseInt(attendancePercentage);
    console.log(
      "Updating marks...",
      stuId,
      subId,
      attendancePercentage,
      internalMarks,
      externalMarks
    );

    // console.log(parseInt(attendancePercentage));
    // console.log(marks, attendance);
    handleAssignOperation();
  };

  const handleAssignOperation = () => {
    console.log(attendance);
    console.log(marks);

    try {
      axios
        .put(
          `http://localhost:1100/admin/marks?stuId=${sId}&subId=${selectedSubId}`,
          marks
        )
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            axios.put(
              `http://localhost:1100/admin/attendance?studId=${sId}&attendance=${attendance}`
            );
            if (user === "admin") {
              window.location.href = "/dashboard/view/admin";
            } else {
              window.location.href = "/dashboard/view/staff";
            }
            toast.success("Student marks and attendance updated", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleModel = (subId) => {
    setSelectedSubId(subId);
    console.log(subId, " : ", sId);
    // handlePostModel(sId, subId);
    setOpenModal(true);

    // if (result) {
    //   toast.success("subject added to the staff");
    // } else {
    //   toast.error("Subject not assigned due to internal error");
    // }

    // Add your logic here to add the selected subject to the staff member
  };

  return (
    <Grid container justifyContent="center">
      <Card
        className="shadow"
        style={{ width: "80%", marginTop: "40px" }}
        sx={{ maxWidth: 600, marginTop: 5, marginBottom: 2, padding: 2 }}
      >
        <ToastContainer />
        <CardContent>
          <Typography className="text-center mb-3" variant="h4" component="h2">
            Update Marks & attendance
          </Typography>
          <Grid container direction="column" alignItems="center">
            <Grid container alignItems="center">
              <Grid className="d-flex justify-content-end w-100" item xs={4}>
                <label className="fw-bolder" htmlFor="studId">
                  Select Student ID* :
                </label>
              </Grid>
              <Grid className="d-flex justify-content-end" item xs={8}>
                <select
                  className="form-select w-50"
                  id="studId"
                  //   value={sId}
                  onChange={handleStudenIdChange}
                >
                  <option value={0}>Select Student ID</option>
                  {studId.map((studId) => (
                    <option key={studId} value={studId}>
                      {studId}
                    </option>
                  ))}
                </select>
              </Grid>
            </Grid>
            <Grid item>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="fw-bold" sx={{ fontSize: "17px" }}>
                      Subject ID
                    </TableCell>
                    <TableCell className="fw-bold" sx={{ fontSize: "17px" }}>
                      Subject Name
                    </TableCell>
                    <TableCell className="fw-bold" sx={{ fontSize: "17px" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.length > 0 ? (
                    subjects.map((subject) => (
                      <TableRow key={subject.subjectId}>
                        <TableCell>{subject.subjectId}</TableCell>
                        <TableCell>{subject.subjectName}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleModel(subject.subjectId)}
                          >
                            Fill Marks
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Typography>Subjects not found</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <AddMarksModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        stuId={sId}
        subId={selectedSubId}
        handlePostModel={handlePostModel}
      />
      <ToastContainer />
    </Grid>
  );
};

export default AddMarks;
