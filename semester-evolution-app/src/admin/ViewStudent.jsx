import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import logo from "../avatar.png";
import { useNavigate } from "react-router-dom";
import { deleteStudent } from "../service/ServiceComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewStudent = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    const response = await axios.get("http://localhost:1100/staff");
    console.log(response.data);
    setStudents(response.data);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 70 },
    {
      field: "profilePicture",
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
    deleteStudent(id).then((resp) => {
      if (resp.data === true) {
        // window.location.href = "/dashboard/view/admin";
        fetchStaffs();
        toast.success("staff Removed");
      } else {
        toast.error("technical error");
      }
    });
  };

  return (
    <div className="m-5">
      <ToastContainer />
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={8}>
          <h3 className="text-center">View Student</h3>
          <Grid
            className="shadow mt-2"
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
            {students.map((student, index) => {
              let imageSrc = student.studentProfile.stuProfilePicture;
              return (
                <Grid key={index} item xs={12}>
                  <Grid
                    container
                    spacing={1}
                    sx={{ borderBottom: "1px solid #ddd" }}
                  >
                    <Grid item xs={2} sx={{ padding: "10px" }}>
                      {student.studentProfile.stuProfileId}
                    </Grid>
                    <Grid item xs={2} sx={{ padding: "10px" }}>
                      {student.studentProfile.studentName}
                    </Grid>
                    <Grid item xs={3} sx={{ padding: "10px" }}>
                      {student.studentProfile.studentEmail}
                    </Grid>
                    <Grid item xs={2} sx={{ padding: "10px" }}>
                      <img
                        height="50px"
                        width="50px"
                        className="border rounded-circle ms-5"
                        src={
                          student.studentProfile.stuProfilePicture !== null
                            ? `data:image/jpeg;base64,${imageSrc}`
                            : logo
                        }
                        alt={student.studentProfile.studentName}
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
                          handleDelete(student.studentProfile.stuProfileId)
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

export default ViewStudent;
