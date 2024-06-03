import React, { useEffect, useState } from "react";
import { getAllSubjectOfStudent } from "../service/ServiceComponent";
import ViewMark from "./ViewMark";

const StudentSubject = () => {
  let [subjects, setSubjects] = useState([]);
  let [currentUser, setCurrentUser] = useState({});
  let [search, setSearch] = useState("");

  useEffect(() => {
    setCurrentUser(JSON.parse(sessionStorage.getItem("student")));
  }, []);

  useEffect(() => {
    const fetchStudentSubjects = async () => {
      try {
        const response = await getAllSubjectOfStudent(currentUser.stuMapId);
        console.log(response.data);
        setSubjects(response.data);
        sessionStorage.setItem("subjects", JSON.stringify(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    if (currentUser.stuMapId !== undefined) {
      fetchStudentSubjects();
    }
  }, [currentUser]);

  //search employee
  let searchData = (e) => {
    e.preventDefault();
    let value = e.target.value;
    // console.log(value);
    if (value !== "") {
      setSearch(value);
      // console.log(search + " : search");
      const filteredSubjects = subjects.filter((subject) =>
        subject.subjectName.toLowerCase().includes(value)
      );
      setSubjects(filteredSubjects);
    } else {
      setSubjects(JSON.parse(sessionStorage.getItem("subjects")));
      setSearch(value);
    }
  };

  return (
    <>
      <div>
        <div className="container-fluid mt-3 mb-5 ps-3 pe-3">
          <div className="conatiner border shadow rounded d-flex flex-column justify-content-center ps-4 pe-4">
            <h2 className="text-center mt-2">Subjects</h2>
            <div className="">
              <div className=" d-flex justify-content-end   m-0 p-0 mb-2 ">
                <div className="form-group d-flex  gap-2 align-items-center">
                  <label className="fw-medium fs-3" htmlFor="name">
                    search
                  </label>
                  <input
                    className="form-control "
                    type="text"
                    id="name"
                    placeholder="subject name"
                    value={search}
                    name="name"
                    onChange={searchData}
                  />
                </div>
              </div>
            </div>
            {/* Table starts */}
            <div className="">
              <table className="table table-striped table-bordered ">
                <thead className=" border-top">
                  <tr>
                    <th className="fw-bold text-center">S.No</th>
                    <th className="fw-bold text-center">Subject ID</th>
                    <th className="fw-bold text-center">Subject Name</th>
                    <th className="fw-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(subjects.length)}
                  {subjects.length > 0 ? (
                    subjects.map((subject, index) => {
                      // const overallResult = subject.marks[0].overallResult;

                      // let overallColor =
                      //   overallResult === "Pass" ? "green" : "red";
                      let subName = subject.subjectName;
                      const subCode = subName.substring(0, 1);
                      return (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">
                            {subCode + 1001}
                            {subject.subjectId}
                          </td>
                          <td className="text-center">
                            {subject.subjectName}{" "}
                          </td>
                          {/* <td
                            className="fw-medium"
                            style={{ color: overallColor }}
                          >
                            {overallResult}
                          </td> */}
                          {/* <td>{subject.salary}</td> */}
                          <td className="text-center">
                            <div className="container d-flex justify-content-center ">
                              <ViewMark subject={subject} />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSubject;
