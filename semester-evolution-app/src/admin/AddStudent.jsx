import React, { useState } from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddStudentContainer = styled("div")({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  //   border: "1px solid #ccc",
  //   padding: "30px",
  //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  width: "500px",
  margin: "0 auto",
});

const AddStudent = ({ user }) => {
  const [file, setFile] = useState();

  const [studentProfile, setStudentProfile] = useState({
    studentName: "",
    studentEmail: "",
    stuProfilePicture: null,
    stuContact: "",
    stuAttPercentage: "",
  });

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [attPercentageError, setAttPercentageError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "stuProfilePicture") {
      setFile(URL.createObjectURL(files[0]));
      console.log(URL.createObjectURL(files[0]));
    }

    setStudentProfile((prev) => ({
      ...prev,
      [name]: name === "stuProfilePicture" ? files[0] : value,
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "studentName":
        setNameError(!/^[a-zA-Z ]{2,30}$/.test(value));
        break;
      case "studentEmail":
        setEmailError(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value));
        break;
      case "stuContact":
        setContactError(
          !/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/.test(value)
        );
        break;
      case "stuAttPercentage":
        setAttPercentageError(!/^\d{1,3}$/.test(value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(file);
    console.log(studentProfile);
    const {
      studentName,
      studentEmail,
      stuProfilePicture,
      stuContact,
      stuAttPercentage,
    } = studentProfile;

    if (
      !studentName ||
      !studentEmail ||
      !stuProfilePicture ||
      !stuContact ||
      !stuAttPercentage
    ) {
      toast.warning("all the fields are mandatory.");
      return;
    }
    const formData = new FormData();
    for (const [key, value] of Object.entries(studentProfile)) {
      formData.append(key, value);
    }

    // Send the form data to the server
    console.log(studentProfile);
    console.log(formData);

    axios
      .put(`http://localhost:1100/admin/addStudent`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setStudentProfile({
          studentName: "",
          studentEmail: "",
          stuProfilePicture: null,
          stuContact: "",
          stuAttPercentage: "",
        });
        setFile("");
        toast.success("Stduent added successfully!!!");
        if (user === "admin") {
          window.location.href = "/dashboard/view/admin";
        } else {
          window.location.href = "/dashboard/view/staff";
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!!!");
      });
  };

  return (
    <AddStudentContainer>
      <ToastContainer />
      <div className="border rounded shadow mt-5 pt-2 p-5">
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" textAlign="center" marginBottom="10px">
            Add Student
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Student Name"
                name="studentName"
                value={studentProfile.studentName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                helperText={
                  nameError
                    ? "Name should contain only alphabets and should be between 2 and 30 characters long"
                    : ""
                }
                error={nameError}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={7}>
                <TextField
                  label="Student Email"
                  name="studentEmail"
                  value={studentProfile.studentEmail}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  helperText={emailError ? "Invalid email address" : ""}
                  error={emailError}
                  fullWidth
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Contact"
                  name="stuContact"
                  value={studentProfile.stuContact}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  helperText={
                    contactError
                      ? "Contact should be a 10-digit and acceptable number"
                      : ""
                  }
                  error={contactError}
                  fullWidth
                />
              </Grid>
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                label="Password"
                name="stuPassword"
                value={studentProfile.stuPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                helperText={
                  passwordError
                    ? "Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit"
                    : ""
                }
                error={passwordError}
                fullWidth
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                label="Attendance Percentage"
                name="stuAttPercentage"
                value={studentProfile.stuAttPercentage}
                onChange={handleInputChange}
                onBlur={handleBlur}
                helperText={
                  attPercentageError
                    ? "Attendance percentage should be a number between 1 and 100"
                    : ""
                }
                error={attPercentageError}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <label className="fw-bold me-2" htmlFor="profilePicture">
                  Profile Picture:
                </label>
                <img
                  id="profilePicture"
                  src={file}
                  alt="alter"
                  style={{ height: "60px", width: "80px" }}
                />
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="center">
                  {/* <FilledInput
                    type="file"
                    accept="image/*"
                    name="stuProfilePicture"
                    onChange={handleInputChange}
                    inputProps={{
                      style: {
                        border: "none",
                        borderRadius: "40",
                        //   borderBottom: "1px solid #ccc",
                      },
                    }}
                  /> */}

                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                    <VisuallyHiddenInput
                      name="stuProfilePicture"
                      onChange={handleInputChange}
                      type="file"
                    />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Box
            mt={2}
            display="flex"
            width="100%"
            flexDirection="row"
            justifyContent="space-evenly"
          >
            <Button variant="contained" color="primary" type="submit">
              Add Student
            </Button>
            <Button
              variant="contained"
              LinkComponent="a"
              href="/dashboard/view/admin"
              color="warning"
              type="button"
            >
              Back
            </Button>
          </Box>
        </form>
      </div>
    </AddStudentContainer>
  );
};

export default AddStudent;
