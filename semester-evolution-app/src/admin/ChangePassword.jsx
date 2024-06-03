import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { studentUpdatePassword } from "../service/ServiceComponent";

const ChangePassword = ({ user }) => {
  // console.log(user);
  const navigate = useNavigate();
  const [existingPassword, setExistingPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [existingPasswordError, setExistingPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [admin, setAdmin] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserProfile, setCurrentUserProfile] = useState({});

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user === "admin") {
      setAdmin(JSON.parse(sessionStorage.getItem("admin")));
    } else if (user === "staff") {
      setCurrentUser(JSON.parse(sessionStorage.getItem("staff")));
      setCurrentUserProfile(JSON.parse(sessionStorage.getItem("staffProfile")));
    } else {
      setCurrentUser(JSON.parse(sessionStorage.getItem("student")));
    }
  }, [user]);

  // console.log(admin);
  // console.log(currentUser);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "existingPassword") {
      setExistingPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name === "existingPassword") {
      if (value.length < 8) {
        setExistingPasswordError(
          "Existing password must be at least 6 characters long."
        );
      } else {
        // setAdmin({ ...admin, adminPassword: value });
        setPassword(value);
        setExistingPasswordError("");
      }
    } else if (name === "newPassword") {
      if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value)) {
        setNewPasswordError(
          "Password must contain at least one lowercase and one uppercase letter and be at least 6 characters long."
        );
      } else {
        setNewPasswordError("");
        console.log(password);
        if (user === "staff") {
          setCurrentUserProfile({
            ...currentUserProfile,
            staffPassword: password,
          });
        } else {
          setCurrentUserProfile({
            ...currentUserProfile,
            stuPassword: password,
          });
        }
      }
    } else if (name === "confirmPassword") {
      console.log(value, newPassword);
      if (value !== newPassword && value !== "") {
        console.log("confirm pass");
        setConfirmPasswordError("Confirm password must match new password.");
      } else {
        if (user === "staff") {
          console.log("confirm pass");
          setCurrentUser({
            ...currentUser,
            staffProfile: currentUserProfile,
          });
        } else {
          setCurrentUser({
            ...currentUser,
            studentProfile: currentUserProfile,
          });
        }
        setConfirmPasswordError("");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(existingPasswordError, newPasswordError, confirmPasswordError);
    if (
      !existingPasswordError === "" ||
      !newPasswordError === "" ||
      !confirmPasswordError === ""
    ) {
      toast.warning("All fields are mandatory!!!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("New password and confirm password do not match.");
      return;
    }

    console.log(password);
    console.log(confirmPassword);
    console.log(currentUser);
    console.log(currentUserProfile);
    try {
      if (user === "admin") {
        axios
          .post(
            `http://localhost:1100/admin/updatePass?newPass=${confirmPassword}`,
            admin
          )
          .then((response) => {
            if (response.data === true) {
              console.log("hello");
            }
            console.log(response);
            setExistingPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setExistingPasswordError("");
            setNewPasswordError("");
            setConfirmPasswordError("");
            navigate("/dashboard/view/admin");
            toast.success("Password updated successfully!");
          })
          .catch((err) => alert(err));
      } else if (user === "staff") {
        axios
          .put(
            `http://localhost:1100/staff/updatePass?newPass=${confirmPassword}`,
            currentUser
          )
          .then((response) => {
            console.log(response);
            setExistingPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setExistingPasswordError("");
            setNewPasswordError("");
            setConfirmPasswordError("");
            navigate("/dashboard/view/staff");
            toast.success("Password updated successfully!");
          })
          .catch((err) => alert(err));
      } else {
        console.log("student da", confirmPassword, currentUser);
        try {
          studentUpdatePassword(confirmPassword, currentUser)
            .then((res) => {
              console.log(res);
              setExistingPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setExistingPasswordError("");
              setNewPasswordError("");
              setConfirmPasswordError("");
              // navigate("/dashboard/student");
              toast.success("Password updated successfully!");
              navigate("/dashboard/student");
            })
            .catch((err) => {
              toast.error(err);
            });
        } catch (error) {
          toast.error(error + "try reload");
        }
      }
    } catch (error) {
      toast.error("Technical error !");
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <ToastContainer />
          <Box
            className="border"
            width="80%"
            height="60%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            padding="2rem"
            margin="2rem"
            borderRadius="1rem"
            boxShadow="0 0 10px 0 rgba(0,0,0,0.2)"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Change Password
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type={showPassword ? "text" : "password"}
                  name="existingPassword"
                  value={existingPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={existingPasswordError !== ""}
                  label="Existing Password"
                  fullWidth
                  variant="outlined"
                  helperText={existingPasswordError}
                  // InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={newPasswordError !== ""}
                  label="New Password"
                  fullWidth
                  variant="outlined"
                  helperText={newPasswordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownNewPassword}
                          edge="end"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={confirmPasswordError !== ""}
                  label="Confirm Password"
                  fullWidth
                  variant="outlined"
                  helperText={confirmPasswordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                  fullWidth
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ChangePassword;
