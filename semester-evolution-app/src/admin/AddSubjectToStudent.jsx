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
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSubjectToStudent = () => {
  const [sId, setSid] = useState(0);
  const [studId, setStudId] = useState([]);
  const [subjects, setSubjects] = useState([]);
  //   const [selectedSubject, setSelectedSubject] = useState(null);

  const fetchStudentIds = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1100/admin/getStudents"
      );
      setStudId(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching student IDs:", error);
      return [];
    }
  };

  const fetchSubjects = async (studId) => {
    try {
      const response = await axios.get(
        `http://localhost:1100/admin/getSubNotInStu?studId=${studId}`
      );
      console.log(response.data);
      setSubjects(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching subjects:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchStudentIds();
  }, []);

  const handleStaffIdChange = (event) => {
    let value = parseInt(event.target.value);
    console.log(parseInt(event.target.value));
    setSid(value);
    return value > 0 ? fetchSubjects(value) : 0;
  };

  const handleAssignOperation = async (stuId, subId) => {
    console.log(subId, " : sId ", stuId);
    try {
      const response = await axios.post(
        `http://localhost:1100/admin/addSubjectStudent?stuId=${stuId}&subId=${subId}`
      );
      console.log(response.data);
      fetchSubjects(sId);
      return response.data;
    } catch (error) {
      console.error("Error assigning subject:", error);
      return false;
    }
  };

  const handleAddSubject = (subId) => {
    // setSelectedSubject(subId);
    console.log(subId, " : ", sId);
    const result = handleAssignOperation(sId, subId);

    if (result) {
      toast.success("subject added to the student");
    } else {
      toast.error("Subject not assigned due to internal error");
    }

    // Add your logic here to add the selected subject to the staff member
  };

  return (
    <Grid container justifyContent="center">
      <Card
        className="shadow"
        style={{ width: "70%", marginTop: "40px" }}
        sx={{ maxWidth: 600, marginTop: 5, marginBottom: 2, padding: 2 }}
      >
        <ToastContainer />
        <CardContent>
          <Typography className="text-center mb-3" variant="h4" component="h2">
            Add Subject To Student
          </Typography>
          <Grid container direction="column" alignItems="center">
            <Grid container alignItems="center">
              <Grid className="d-flex justify-content-end me-2" item xs={3}>
                <label className="fw-bolder" htmlFor="studId">
                  Select Student ID:
                </label>
              </Grid>
              <Grid item xs={8}>
                <select
                  className="form-select w-50"
                  id="studId"
                  //   value={sId}
                  onChange={handleStaffIdChange}
                >
                  <option value={sId}>Select Student</option>
                  {studId.map((student) => (
                    <option key={student.stuMapId} value={student.stuMapId}>
                      {student.stuMapId +
                        "    -    " +
                        student.studentProfile.studentName}
                    </option>
                  ))}
                </select>
              </Grid>
            </Grid>
            <Grid item>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject ID</TableCell>
                    <TableCell>Subject Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map((subject) => (
                    <TableRow key={subject.subjectId}>
                      <TableCell>{subject.subjectId}</TableCell>
                      <TableCell>{subject.subjectName}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAddSubject(subject.subjectId)}
                        >
                          Add Subject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AddSubjectToStudent;
