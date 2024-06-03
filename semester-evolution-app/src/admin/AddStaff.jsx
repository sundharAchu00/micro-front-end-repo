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

const AddStaffContainer = styled("div")({
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

const AddStaff = () => {
  const [file, setFile] = useState();

  const [staffProfile, setStaffProfile] = useState({
    staffName: "",
    staffEmail: "",
    staffProfilePicture: null,
    staffContact: "",
  });

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    console.log(value);

    if (name === "staffProfilePicture") {
      console.log("pic");
      setFile(URL.createObjectURL(files[0]));
      console.log(URL.createObjectURL(files[0]));
    }

    setStaffProfile((prev) => ({
      ...prev,
      [name]: name === "staffProfilePicture" ? files[0] : value,
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "staffName":
        setNameError(!/^[a-zA-Z ]{2,30}$/.test(value));
        break;
      case "staffEmail":
        setEmailError(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value));
        break;
      // case "staffPassword":
      //   setPasswordError(!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value));
      //   break;
      case "staffContact":
        setContactError(
          !/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/.test(value)
        );
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(file);
    const { staffName, staffEmail, staffProfilePicture, staffContact } =
      staffProfile;

    if (!staffName || !staffEmail || !staffProfilePicture || !staffContact) {
      toast.warning("all the fields are mandatory.");
      return;
    }
    const formData = new FormData();
    for (const [key, value] of Object.entries(staffProfile)) {
      formData.append(key, value);
    }

    // Send the form data to the server
    console.log(formData);
    setStaffProfile({
      staffName: "",
      staffEmail: "",
      staffProfilePicture: null,
      staffContact: "",
    });
    setFile("");
    axios
      .put(`http://localhost:1100/admin?id=1`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Faculty added successfully!!!");
        // navigate("/dashboard/view/admin");
        window.location.href = "/dashboard/view/admin";
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!!!");
      });
  };

  return (
    <AddStaffContainer>
      <ToastContainer />
      <div className="border rounded shadow mt-5 pt-2 p-5">
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" textAlign="center" marginBottom="10px">
            Add Faculty
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Staff Name"
                name="staffName"
                value={staffProfile.staffName}
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
                  label="Staff Email"
                  name="staffEmail"
                  value={staffProfile.staffEmail}
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
                  name="staffContact"
                  value={staffProfile.staffContact}
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
                name="staffPassword"
                value={staffProfile.staffPassword}
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

            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <img
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
                    name="staffProfilePicture"
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
                      name="staffProfilePicture"
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
              Add Staff
            </Button>
            <Button
              variant="contained"
              LinkComponent="a"
              href="/dashboard/view/admin"
              // onClick={() => {
              //   console.log("click");
              //   navigate("/dashboard/view/admin");
              // }}
              color="warning"
              type="button"
            >
              Back
            </Button>
          </Box>
        </form>
      </div>
    </AddStaffContainer>
  );
};

export default AddStaff;
