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

const AddSubjectToStaff = () => {
  const [sId, setSid] = useState(0);
  const [staffId, setStaffId] = useState([]);
  const [subjects, setSubjects] = useState([]);
  //   const [selectedSubject, setSelectedSubject] = useState(null);

  const fetchStaffIds = async () => {
    try {
      const response = await axios.get("http://localhost:1100/admin/getStaff");
      setStaffId(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching staff IDs:", error);
      return [];
    }
  };

  const fetchSubjects = async (staffId) => {
    console.log(staffId);
    try {
      const response = await axios.get(
        `http://localhost:1100/admin/getSubNotStaff?staffId=${staffId}`
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
    fetchStaffIds();
  }, []);

  const handleStaffIdChange = (event) => {
    let value = parseInt(event.target.value);
    setSid(value);
    return value > 0 ? fetchSubjects(value) : 0;
  };

  const assignSubjectCall = async (sId, subjectId) => {
    console.log(subjectId, " : sId ", sId);
    try {
      const response = await axios.put(
        `http://localhost:1100/admin/updateSub?staffId=${sId}&subjectId=${subjectId}`
      );
      console.log(response.data);
      fetchSubjects(sId);
      return response.data;
    } catch (error) {
      console.error("Error assigning subject:", error);
      return false;
    }
  };

  const handleAddSubject = (subject) => {
    // setSelectedSubject(subject);
    console.log(subject, " : sId ", sId);

    //get once after the successful assignment of the subject
    const result = assignSubjectCall(sId, subject);

    if (result) {
      toast.success("subject added to the staff");
    } else {
      toast.error("Subject not assigned due to internal error");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Card
        className="shadow"
        style={{ width: "50%", marginTop: "40px" }}
        sx={{ maxWidth: 600, marginTop: 5, marginBottom: 2, padding: 2 }}
      >
        <ToastContainer />
        <CardContent>
          <Typography className="text-center mb-3" variant="h4" component="h2">
            Add Subject To Staff
          </Typography>
          <Grid container direction="column" alignItems="center">
            <Grid container alignItems="center">
              <Grid className="d-flex justify-content-end me-2" item xs={3}>
                <label className="fw-bolder" htmlFor="staffId">
                  Select Staff ID:
                </label>
              </Grid>
              <Grid item xs={8}>
                <select
                  className="form-select"
                  id="staffId"
                  //   value={sId}
                  onChange={handleStaffIdChange}
                >
                  <option value={sId}>Select Staff</option>
                  {staffId.map((staff) => (
                    <option key={staff.staffId} value={staff.staffId}>
                      {staff.staffId + "  -  " + staff.staffProfile.staffName}
                    </option>
                  ))}
                </select>
              </Grid>
            </Grid>
            <Grid item>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="fw-bold fs-6">Subject ID</TableCell>
                    <TableCell className="fw-bold fs-6">Subject Name</TableCell>
                    <TableCell className="fw-bold fs-6">Action</TableCell>
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

export default AddSubjectToStaff;
