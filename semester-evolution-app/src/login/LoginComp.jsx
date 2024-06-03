import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, studentLogin } from "../service/ServiceComponent";

const LoginComp = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleEmailChange = (event) => {
    setLoginDetails({ ...loginDetails, email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setLoginDetails({ ...loginDetails, password: event.target.value });
  };

  const handleBlur = (field) => (event) => {
    setTouched({ ...touched, [field]: true });
    if (
      field === "email" &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        loginDetails.email
      )
    ) {
      setError("Invalid email address");
      setHasError(true);
    } else if (field === "password" && loginDetails.password.length < 8) {
      setError("Password must be at least 8 characters");
      setPasswordError(true);
    } else {
      setError("");
      setPasswordError(false);
      setHasError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!loginDetails.email || !loginDetails.password) {
      toast.warning("Email and password are required");
      setHasError(true);
    } else {
      // Handle login logic here
      if (user === "student") {
        console.log(user);
        studentLogin(loginDetails.email, loginDetails.password).then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data);
            sessionStorage.setItem("student", JSON.stringify(resp.data));
            sessionStorage.setItem(
              "studentProfile",
              JSON.stringify(resp.data.studentProfile)
            );
            console.log("Login successful!");
            toast.success("Logged in successfully!!!");
            setPasswordError(false);
            setHasError(false);
            setLoginDetails({ email: "", password: "" });
            navigate("/dashboard/student");
          } else {
            toast.error(`${resp.data}`);
          }
        });
      } else {
        console.log(user);
        login(loginDetails.email, loginDetails.password, user)
          .then((resp) => {
            if (user === "admin") {
              console.log(resp.data);
              console.log("Login successful!");
              toast.success("Logged in successfully!!!");
              setPasswordError(false);
              setHasError(false);
              setLoginDetails({ email: "", password: "" });
              sessionStorage.setItem("admin", JSON.stringify(resp.data));
              navigate("/dashboard/view/admin");
            } else if (user === "staff") {
              // alert("lets proceed");
              console.log(resp.data);
              navigate("/dashboard/view/staff");
              toast.success("Logged in successfully!!!");
              setLoginDetails({ email: "", password: "" });
              sessionStorage.setItem("staff", JSON.stringify(resp.data));
              sessionStorage.setItem(
                "staffProfile",
                JSON.stringify(resp.data.staffProfile)
              );
              setPasswordError(false);
              setHasError(false);
            }
          })
          .catch((err) => toast.error("Wrong credentials!!!"));
      }
    }
  };

  return (
    <Container maxWidth="sm" className="vh-100 d-flex align-items-center">
      <ToastContainer />
      <Card elevation={3} className="p-4">
        <CardContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <div className="container d-flex flex-column justify-content-center">
                <Avatar
                  className="bg-primary d-flex justify-content-center"
                  sx={{ m: 1, marginLeft: "210px" }}
                >
                  <LockOutlinedIcon />
                </Avatar>
                <span className="fw-bold text-center">Welcome {user}</span>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                value={loginDetails.email}
                onChange={handleEmailChange}
                onBlur={handleBlur("email")}
                error={hasError && touched.email}
                helperText={error}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                value={loginDetails.password}
                onChange={handlePasswordChange}
                onBlur={handleBlur("password")}
                error={passwordError && touched.password}
                helperText={passwordError ? error : null}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={hasError || passwordError}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginComp;
