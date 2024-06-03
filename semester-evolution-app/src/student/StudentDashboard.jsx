import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../logo.png";
import StudentHome from "./StudentHome";
import StudentReport from "./StudentReport";
import ProfilePage from "../staff/ProfilePage";
import { useNavigate, useParams } from "react-router-dom";
import ChangePassword from "../admin/ChangePassword";
import StudentSubject from "./StudentSubject";

const pages = ["Subject", "Result"];
const settings = ["Profile", "Change password", "Logout"];

function StudentDashboard() {
  const { user } = useParams();

  const navigate = useNavigate();

  let [userProfile, setUserProfile] = React.useState({});

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [currentPage, setCurrentPage] = React.useState("home");

  React.useEffect(() => {
    setUserProfile(JSON.parse(sessionStorage.getItem("studentProfile")));
  }, [user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting) => {
    console.log(setting);
    if (setting === "Profile") {
      setCurrentPage("student/profile");
    } else if (setting === "Change password") {
      setCurrentPage("student/changepassword");
    } else {
      sessionStorage.removeItem("studentProfile");
      sessionStorage.removeItem("student");
      sessionStorage.removeItem("subjects");
      navigate("/");
    }
  };

  const handlePages = (page) => {
    console.log(page);
    if (page === "Result") {
      setCurrentPage("student/report");
    } else if (page === "Subject") {
      setCurrentPage("student/subject");
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        className=" border-bottom shadow"
        style={{ top: "0px" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/dashboard/student"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                className="rounded-circle me-2"
                src={logo}
                alt="logo"
                height="50px"
              />
              <span className="mt-2">KCET</span>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => handlePages(page)}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/dashboard/student"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                className="rounded-circle me-2"
                src={logo}
                alt="logo"
                height="50px"
              />
              <span className="mt-2">KCET</span>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePages(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    // alt="Profile pic"
                    src={
                      userProfile !== null
                        ? `data:image/jpeg;base64,${userProfile.stuProfilePicture}`
                        : logo
                    }
                    alt="Profile pic"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => handleSettingClick(setting)}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div>
        {currentPage === "home" && <StudentHome />}
        {currentPage === "student/report" && <StudentReport user={user} />}
        {currentPage === "student/subject" && <StudentSubject user={user} />}
        {currentPage === "student/profile" && <ProfilePage user={user} />}
        {currentPage === "student/changepassword" && (
          <ChangePassword user={user} />
        )}
      </div>
    </>
  );
}
export default StudentDashboard;
