import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import LoginIcon from "@mui/icons-material/Login";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";

const settings = ["Admin Login", "Staff Login", "Student Login"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  const handleLogin = (user) => {
    // console.log(user);
    if (user === "Admin Login") {
      console.log("admin");
      navigate(`/login/admin`);
    } else if (user === "Staff Login") {
      console.log("Staff");
      navigate(`/login/staff`);
    } else {
      console.log("Student");
      navigate(`/login/student`);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            className="rounded-circle me-2"
            src={logo}
            alt="logo"
            height="50px"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            className="fw-bolder fs-3 fst-italic"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KCET
          </Typography>
          <span className="">
            (Kamaraj college of engineering and technology)
          </span>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* <MenuIcon /> */}
              <img
                className="rounded-circle me-2"
                src={logo}
                alt="logo"
                height="50px"
              />
            </IconButton>
          </Box>
          {/* <DescriptionIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            className="fw-bolder fs-3 fst-italic"
            href="/"
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
            KCET
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* <Button
              // onClick={() => navigate("/sell")
              // }
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {window.sessionStorage.getItem("bidder") ? null : "Sell"}
            </Button> */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <LoginIcon
                  sx={{ color: "white", fontSize: "40px", fontWeight: "Bold" }}
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
              {/* <MenuItem
              // onClick={() => navigate("/")}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem> */}
              {settings.map((setting, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleLogin(setting);
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
