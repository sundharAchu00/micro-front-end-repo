import React, { useEffect, useState } from "react";
import { getStudnetSubjects, overallResult } from "../service/ServiceComponent";
import logo from "../avatar.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const StudentReport = ({ user }) => {
  console.log(user);

  let [currentUser, setCurrentUser] = useState({});
  let [userProfile, setUserProfile] = useState({});

  let [subjects, setSubjects] = useState([]);

  let [desc, setDesc] = useState("");

  let overallPass = [];

  useEffect(() => {
    console.log(user);

    let overallResponse = [];
    try {
      overallResponse = overallResult(
        JSON.parse(sessionStorage.getItem("student")).stuMapId
      ).then((resp) => {
        console.log(resp);
        setDesc(resp.data);
        if (resp.data === "Student passed keep growing up") {
          setSubjects(JSON.parse(sessionStorage.getItem("subjects")));
        } else {
          setSubjects([]);
        }
      });
    } catch (error) {
      if (overallResponse === undefined) {
        console.log("found undefined");
      } else {
        setSubjects([]);
      }
      console.log(error);
    }

    setCurrentUser(JSON.parse(sessionStorage.getItem("student")));
    setUserProfile(JSON.parse(sessionStorage.getItem("studentProfile")));

    console.log(
      "fetch subject " + JSON.parse(sessionStorage.getItem("student")).stuMapId
    );
    let response = [];
    try {
      console.log(overallResponse.data);
      if (
        overallResponse === "[Subject Not assigned yet]" ||
        overallResponse.data === undefined
      ) {
        setSubjects([]);
      } else {
        response = getStudnetSubjects(
          JSON.parse(sessionStorage.getItem("student")).stuMapId
        ).then((resp) => {
          console.log(resp.data);
        });
        console.log(response.data);
        setSubjects(response.data);
      }
    } catch (error) {
      if (response === undefined) {
        console.log("found undefined");
      } else {
        setSubjects([]);
      }
      console.error(error);
    }

    if (overallResponse.data === "Student passed keep growing up") {
      console.log("student passed");
      console.log("session subject present");
      // setSubjects(JSON.parse(sessionStorage.getItem("subjects")));
    }
    if (JSON.parse(sessionStorage.getItem("subjects"))) {
      console.log("student failed");
      // } else {
      console.log("session subject not present");
      // setSubjects(JSON.parse(sessionStorage.getItem("subjects")));
      setSubjects([]);
    }
  }, [user]);

  // useEffect(() => {
  //   const fetchStudentSubjects = async () => {
  //     console.log("fetch sibject " + currentUser.stuMapId);
  //     let response = [];
  //     try {
  //       response = await getStudnetSubjects(currentUser.stuMapId).then(
  //         (resp) => {
  //           console.log(resp.data);
  //         }
  //       );
  //       console.log(response.data);
  //       setSubjects(response.data);
  //     } catch (error) {
  //       if (response === undefined) {
  //         console.log("found undefined");
  //       } else {
  //         setSubjects([]);
  //       }
  //       console.error(error);
  //     }
  //   };

  //   if (currentUser.stuMapId !== undefined) {
  //     fetchStudentSubjects();
  //   }
  // }, [currentUser]);

  // //   console.log(userProfile);
  // // Export function
  const handleDownloadPDF = () => {
    const input = document.getElementById("studentCard");
    // Specify the id of the element you want to convert to PDF
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("marksheet.pdf");
      // Specify the name of the downloaded PDF file
    });
  };

  return (
    <>
      <div>
        <div className="container mb-5 w-75" style={{ marginTop: "2%" }}>
          <div className="card w-100" id="studentCard">
            <div className="card-body">
              <h5 className="card-title text-center">
                KCET (Kamaraj Colllege of engineering and technology)
              </h5>

              <div className="container p-2" style={{ marginTop: "5%" }}>
                <img
                  src={
                    userProfile.stuProfilePicture !== null
                      ? `data:image/jpeg;base64,${userProfile.stuProfilePicture}`
                      : logo
                  }
                  className="img-fluid me-5 float-end border border-dark"
                  id="studentProfile"
                  alt=""
                />

                <div className="card-text">
                  <p>
                    <b>Student Id : </b>
                    KCET100
                    {currentUser.stuMapId}
                  </p>

                  <p>
                    <b>Student Name : </b>
                    {userProfile !== null
                      ? userProfile.studentName
                      : "Loading..."}
                  </p>

                  <p>
                    <b>Student Email : </b>
                    {userProfile !== null
                      ? userProfile.studentEmail
                      : "Loading..."}
                  </p>
                </div>
              </div>

              <label
                htmlFor="listofStudents"
                className="form-label"
                style={{ marginTop: "5%" }}
              >
                <b>List of Students :</b>
              </label>

              <table className="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th scope="col">Subject Id</th>

                    <th scope="col">Subject Name</th>

                    <th scope="col">Internal Mark</th>

                    <th scope="col">External Mark</th>

                    <th scope="col">Overall Mark</th>

                    <th scope="col">Overall Result</th>
                  </tr>
                </thead>

                <tbody>
                  {/* {console.log(subjects.length + "size")} */}
                  {subjects !== undefined && subjects.length > 0 ? (
                    subjects.map((subject, index) => {
                      console.log(subject);
                      let internal = subject.marks[0].internalPercentage;
                      internal = internal / 2;

                      let external = subject.marks[0].externalPercentage;
                      external = external / 2;

                      const overall = internal + external;
                      const overallResult = subject.marks[0].overallResult;
                      overallPass.push(overallResult);
                      console.log("overall" + overallPass.includes("Fail"));
                      let overallColor =
                        overallResult === "Pass" ? "green" : "red";

                      return (
                        <tr key={subject.subjectId}>
                          <th scope="row">{subject.subjectId}</th>

                          <td>{subject.subjectName}</td>

                          <td>{internal}</td>

                          <td>{external}</td>

                          <td>{overall}</td>

                          <td
                            className="fw-medium"
                            style={{ color: overallColor }}
                          >
                            {overallResult !== null ? overallResult : "NA"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  )}

                  <tr>
                    <th scope="row" className="text-end" colSpan={5}>
                      <b>Result : </b>
                    </th>

                    <td
                      className="fw-medium"
                      style={{
                        color:
                          desc === "Student passed keep growing up"
                            ? "green"
                            : "red",
                      }}
                    >
                      {/* {desc === "Student passed keep growing up"
                        ? "Pass " + desc
                        : desc === "[contact staff]"
                        ? "Result not pulished yet"
                        : "Fail " + desc} */}
                      {desc === "Student passed keep growing up"
                        ? "Pass "
                        : desc === "[Subject Not assigned yet]"
                        ? "N/A"
                        : "Fail " + desc}
                    </td>
                  </tr>
                  {/* description */}
                  <tr>
                    <th scope="row" className="text-end" colSpan={5}>
                      <b>Description : </b>
                    </th>

                    <td
                      className="fw-medium"
                      style={{
                        color:
                          desc === "Student passed keep growing up"
                            ? "green"
                            : "red",
                      }}
                    >
                      {console.log(desc.substring(1, desc.length - 1))}
                      {desc === "[Subject Not assigned yet]" ? "N/A" : desc}

                      {/* desc.substring(1, desc.length - 1)}
                      {desc} */}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="container">
                <a
                  href="/dashboard/student"
                  className="btn btn-warning fw-bold text-white me-2 ms-3"
                  style={{ float: "right" }}
                >
                  Back
                </a>
                <button
                  className="btn fw-bold btn-primary"
                  style={{ float: "right" }}
                  onClick={handleDownloadPDF}
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentReport;
