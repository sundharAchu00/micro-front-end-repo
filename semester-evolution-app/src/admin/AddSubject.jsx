import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PostAddIcon from "@mui/icons-material/PostAdd";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubjectInput = () => {
  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");
  let sub = {
    subjectName: subject,
  };

  const handleAddSubject = () => {
    console.log(subject);
    console.log(sub);
    axios.post(`http://localhost:1100/admin/addSubject`, sub).then((resp) => {
      toast.success("subject added successfully.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    });

    setSubject("");
  };

  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSubject(value);
  };

  const handleSubjectBlur = (event) => {
    const value = event.target.value;
    if (!subject) {
      setSubjectError("Subject is required.");
    } else if (/^[a-zA-Z\s]{4,30}$/.test(value)) {
      setSubjectError("");
    } else {
      setSubjectError(
        "Subject can only contain letters and spaces with a maximum length of 30 characters."
      );
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <ToastContainer />
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <PostAddIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item>
              <Typography variant="h6" component="h2">
                Add Subject
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Subject"
                value={subject}
                onChange={handleSubjectChange}
                onBlur={handleSubjectBlur}
                error={!!subjectError}
                helperText={subjectError}
                inputProps={{ maxLength: 30 }}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddSubject}
                >
                  Add Subject
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SubjectInput;
