import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  Typography,
  ListItemText,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../logo.png";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AddStudent from "./AddStudent";
import AddStaff from "./AddStaff";
import ViewStudent from "./ViewStudent";
import ViewStaff from "./ViewStaff";
import ChangePassword from "./ChangePassword";
import AddSubjectToStaff from "./AddSubjectToStaff";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AddSubjectToStudent from "./AddSubjectToStudent";
import GradingIcon from "@mui/icons-material/Grading";
import AddMarks from "./AddMarks";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddSubject from "./AddSubject";
import StudentOverAll from "../common/StudentOverAll";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AdminLanding from "./AdminLanding";
import ProfilePage from "../staff/ProfilePage";

function AdminView() {
  const { user } = useParams();

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("home"); // default page

  const [open, setOpen] = useState(false);
  const [mini, setMini] = useState(true);

  // const [admin, setAdmin] = useState({});
  // const [staff, setStaff] = useState({});

  // useEffect(() => {
  //   if (user === "admin") {
  //     setAdmin(JSON.parse(sessionStorage.getItem("admin")));
  //   } else {
  //     setStaff(sessionStorage.getItem("staff"));
  //   }
  // }, [user]);

  // console.log(typeof admin);
  // console.log(typeof staff);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMiniToggle = () => {
    setMini(!mini);
  };

  const handleLogout = () => {
    console.log("logout");
    if (user === "admin") {
      sessionStorage.removeItem("admin");
    } else {
      sessionStorage.removeItem("staff");
      sessionStorage.removeItem("staffProfile");
    }
    navigate("/");
  };

  return (
    <div className="">
      <AppBar position="sticky" sx={{ backgroundColor: "#A3DFF7" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography
            variant="h6"
            className="fw-bolder fs-3 fst-italic"
            // sx={{ color: "blue" }}
            noWrap
            component="div"
          >
            <img
              src={logo}
              className="border rounded-circle me-2"
              style={{ width: "50px" }}
              alt="logo"
            />
            KCET
          </Typography>
          {/* <Box sx={{ flexGrow: 0.8 }} /> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: mini ? 100 : 230,
            flexShrink: 0,
            backgroundColor: "#A3DFF7", // grey color
            [`&.MuiDrawer-paper`]: {
              width: mini ? 100 : 230,
              boxSizing: "border-box",
            },
          },
        }}
      >
        <Box className="d-flex">
          <IconButton
            onClick={handleMiniToggle}
            sx={{
              position: "relative",
              top: "10px",
            }}
            style={{
              color: "blue",
            }}
          >
            {mini ? (
              <>
                <MenuOpenIcon style={{ fontSize: 30, fontWeight: "bold" }} />
              </>
            ) : (
              <>
                <MenuIcon style={{ fontSize: 30, fontWeight: "bold" }} />
              </>
            )}
          </IconButton>
          {mini ? (
            <>
              <Typography
                onClick={() => setCurrentPage("home")}
                className="home-btn ms-1 mt-4 text-white fw-semibold"
              >
                Hello{" "}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                onClick={() => setCurrentPage("home")}
                className="home-btn ms-1 mt-4 text-white fw-semibold"
              >
                Hello {user}
              </Typography>
            </>
          )}
        </Box>
        <List>
          {user !== "staff" ? (
            <ListItem
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              component={Link}
              // to="/staff"
              onClick={() => setCurrentPage("staff")}
            >
              <ListItemIcon>
                <PersonSearchIcon style={{ color: "blue" }} />
              </ListItemIcon>
              {!mini && <ListItemText primary="View Faculties" />}
            </ListItem>
          ) : (
            // Insert view profile
            <ListItem
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              component={Link}
              // to="/staff"
              onClick={() => setCurrentPage("Profile")}
            >
              <ListItemIcon>
                <AssignmentIndIcon style={{ color: "blue" }} />
              </ListItemIcon>
              {!mini && <ListItemText primary="Profile" />}
            </ListItem>
          )}

          {/* List item two */}

          <ListItem
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
            component={Link}
            // to="/students"
            onClick={() => setCurrentPage("students")}
          >
            <ListItemIcon>
              <PersonSearchIcon style={{ color: "blue" }} />
            </ListItemIcon>
            {!mini && <ListItemText primary="View Students" />}
          </ListItem>

          {/* List item threee */}
          {user !== "staff" ? (
            <ListItem
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              component={Link}
              // to="/add-staff"
              onClick={() => setCurrentPage("add-staff")}
            >
              <ListItemIcon>
                <PersonAddIcon style={{ color: "blue" }} />
              </ListItemIcon>
              {!mini && <ListItemText primary="Add Faculty" />}
            </ListItem>
          ) : null}

          {/* Add Student */}
          <ListItem
            component={Link}
            onClick={() => setCurrentPage("add-student")}
          >
            <ListItemIcon>
              <PersonAddIcon style={{ color: "blue" }} />
            </ListItemIcon>
            {!mini && <ListItemText primary="Add Student" />}
          </ListItem>

          {/* Add subject to staff */}
          {user !== "staff" ? (
            <ListItem
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              component={Link}
              // to="/add-staff"
              onClick={() => setCurrentPage("admin-add-subj-staff")}
            >
              <ListItemIcon>
                <AutoStoriesIcon style={{ color: "blue" }} />
              </ListItemIcon>
              {!mini && <ListItemText primary="Map Subject to faculty" />}
            </ListItem>
          ) : null}

          {/* Add subject to student */}
          <ListItem
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
            component={Link}
            // to="/add-staff"
            onClick={() => setCurrentPage("admin-add-subj-stud")}
          >
            <ListItemIcon>
              <AutoStoriesIcon style={{ color: "blue" }} />
            </ListItemIcon>
            {!mini && <ListItemText primary="Map Subject to student" />}
          </ListItem>

          {/* Add marks for student */}
          <ListItem
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
            component={Link}
            // to="/add-staff"
            onClick={() => setCurrentPage("updateMarks")}
          >
            <ListItemIcon>
              <GradingIcon style={{ color: "blue" }} />
            </ListItemIcon>
            {!mini && <ListItemText primary="update marks & attendance" />}
          </ListItem>

          {/* Add subject */}
          {user !== "staff" ? (
            <ListItem
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              component={Link}
              // to="/add-staff"
              onClick={() => setCurrentPage("addSubject")}
            >
              <ListItemIcon>
                <PostAddIcon style={{ color: "blue" }} />
              </ListItemIcon>
              {!mini && <ListItemText primary="add subject" />}
            </ListItem>
          ) : null}

          {/* get stduent marks */}
          <ListItem
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
            component={Link}
            // to="/add-staff"
            onClick={() => setCurrentPage("studentOverAll")}
          >
            <ListItemIcon>
              <AutoStoriesIcon style={{ color: "blue" }} />
            </ListItemIcon>
            {!mini && <ListItemText primary="get overAll result" />}
          </ListItem>

          {/* change password */}
          {user !== "staff" ? (
            <ListItem
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              component={Link}
              // to="/admin-setting"
              onClick={() => setCurrentPage("admin-setting")}
            >
              <ListItemIcon>
                <SettingsIcon style={{ color: "blue" }} />
              </ListItemIcon>
              {!mini && <ListItemText primary="Change password" />}
            </ListItem>
          ) : (
            <ListItem
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              component={Link}
              // to="/admin-setting"
              onClick={() => setCurrentPage("staff-setting")}
            >
              <ListItemIcon>
                <SettingsIcon style={{ color: "blue" }} />
              </ListItemIcon>
              {!mini && <ListItemText primary="Change password " />}
            </ListItem>
          )}

          <ListItem
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
            component={Link}
            to="/"
            onClick={handleLogout}
          >
            <ListItemIcon>
              <LogoutIcon style={{ color: "blue" }} />
            </ListItemIcon>
            {!mini && <ListItemText primary="Logout" />}
          </ListItem>
        </List>
      </Drawer>
      <div>
        {/* Content area */}

        <div>
          {currentPage === "staff" && <ViewStaff user={user} />}
          {currentPage === "students" && <ViewStudent />}
          {currentPage === "home" && <AdminLanding />}
          {currentPage === "Profile" && <ProfilePage user={user} />}
          {currentPage === "add-staff" && <AddStaff user={user} />}
          {currentPage === "add-student" && <AddStudent />}
          {currentPage === "admin-setting" && <ChangePassword user={user} />}
          {currentPage === "staff-setting" && <ChangePassword user={user} />}
          {currentPage === "admin-add-subj-staff" && <AddSubjectToStaff />}
          {currentPage === "admin-add-subj-stud" && <AddSubjectToStudent />}
          {currentPage === "studentOverAll" && <StudentOverAll />}
          {currentPage === "updateMarks" && <AddMarks />}
          {currentPage === "addSubject" && <AddSubject />}
        </div>
      </div>
    </div>
  );
}

export default AdminView;
