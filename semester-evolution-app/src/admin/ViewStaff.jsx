import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import logo from "../avatar.png";
import { deleteStaff } from "../service/ServiceComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ViewStaff = () => {
  const [students, setStudents] = useState([]);

  const [adminId, setAdminId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setAdminId(JSON.parse(sessionStorage.getItem("admin")).adminId);

    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:1100/admin/getStaff");
    setStudents(response.data);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 70 },
    {
      field: "staffProfilePicture",
      headerName: "Profile Picture",
      width: 250,
      renderCell: (params) => (
        <img src={params.value || { logo }} alt={params.row.name} />
      ),
    },
    {
      field: "remove",
      headerName: "Remove",
      width: 10,
    },
  ];

  const handleDelete = (id) => {
    console.log(id);
    deleteStaff(id, adminId).then((resp) => {
      if (resp.data === true) {
        navigate("/dashboard/view/admin");
        // window.location.href = "/dashboard/view/admin";
        fetchStudents();
        toast.success("staff removed");
      } else {
        toast.error("technical error");
      }
    });
  };

  return (
    <div className="m-5">
      <ToastContainer />
      <h3 className="text-center">View Faculty</h3>
      <Grid
        container
        justifyContent="center"
        marginTop="18px"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={8}>
          <Grid
            className="shadow"
            container
            spacing={2}
            sx={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                sx={{ borderBottom: "1px solid #ddd" }}
              >
                {columns.map((column) => (
                  <Grid
                    key={column.field}
                    item
                    container
                    xs={column.width / 50}
                    justifyContent="center"
                    border="black"
                    // sx={{ padding: "" }}
                  >
                    <b>{column.headerName}</b>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {students.map((staff, index) => {
              let imageSrc = staff.staffProfile.staffProfilePicture;
              return (
                <Grid key={index} item xs={12}>
                  <Grid
                    container
                    spacing={1}
                    sx={{ borderBottom: "1px solid #ddd" }}
                  >
                    <Grid item xs={2} sx={{ padding: "10px" }}>
                      {staff.staffProfile.staffProfileId}
                    </Grid>
                    <Grid item xs={2} sx={{ padding: "10px" }}>
                      {staff.staffProfile.staffName}
                    </Grid>
                    <Grid item xs={3} sx={{ padding: "10px" }}>
                      {staff.staffProfile.staffEmail}
                    </Grid>
                    <Grid item xs={2} sx={{ padding: "10px" }}>
                      <img
                        height="50px"
                        width="50px"
                        className="border rounded-circle ms-5"
                        src={
                          staff.staffProfile.staffProfilePicture !== null
                            ? `data:image/jpeg;base64,${imageSrc}`
                            : logo
                        }
                        alt={staff.staffProfile.staffName}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      className="d-flex justify-content-end"
                      sx={{ padding: "10px" }}
                    >
                      <Button
                        className="me-3"
                        onClick={() =>
                          handleDelete(staff.staffProfile.staffProfileId)
                        }
                        sx={{ color: "red" }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewStaff;
