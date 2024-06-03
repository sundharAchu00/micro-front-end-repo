import React from "react";

const Marksheet = () => {
  return (
    <>
      <div>
        <div className="container" style={{ marginTop: "2%" }}>
          <div className="card" id="studentCard">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-center">
                KCET (Kamaraj college of engineering & technology)
              </h5>

              <div
                className="container d-flex flex justify-content-between"
                style={{ marginTop: "5%" }}
              >
                <div className="card-text">
                  <p>
                    <b>Student Id : </b>11952
                  </p>

                  <p>
                    <b>Student Name : </b>Sundhar
                  </p>

                  <p>
                    <b>Student Email : </b>sundhar@gmail.com
                  </p>
                </div>
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWWQX20cJl3Q-kww4L_WRCmtbFDbX-PNw4bQ&usqp=CAU"
                    className="img-fluid"
                    id="studentProfile"
                    alt=""
                  />
                </div>
              </div>

              <label
                for="listofStudents"
                className="form-label"
                style={{ marginTop: "5%" }}
              >
                <b>List of Students :</b>
              </label>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Subject Id</th>

                    <th scope="col">Subject Name</th>

                    <th scope="col">Internal Mark</th>

                    <th scope="col">External Mark</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th scope="row">1</th>

                    <td>Tamil</td>

                    <td>10</td>

                    <td>90</td>
                  </tr>

                  <tr>
                    <th scope="row">2</th>

                    <td>English</td>

                    <td>10</td>

                    <td>90</td>
                  </tr>

                  <tr>
                    <th scope="row"></th>

                    <td></td>

                    <td>
                      <b>Result : </b>
                    </td>

                    <td>Pass</td>
                  </tr>
                </tbody>
              </table>

              <div>
                <a
                  href="##"
                  className="btn btn-primary"
                  style={{ float: "right" }}
                >
                  Print
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marksheet;
