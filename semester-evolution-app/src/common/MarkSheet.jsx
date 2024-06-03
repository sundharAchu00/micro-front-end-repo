import React from "react";

const MarkSheet = () => {
  return (
    <>
      <div>
        <div class="container" style={{ marginTop: "2%" }}>
          <div class="card" id="studentCard">
            <div class="card-body">
              <h5 class="card-title text-center">KCET Student Details</h5>

              <div class="container" style={{ marginTop: "5%" }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWWQX20cJl3Q-kww4L_WRCmtbFDbX-PNw4bQ&usqp=CAU"
                  class="img-fluid"
                  id="studentProfile"
                  alt=""
                />

                <div class="card-text">
                  <p>
                    <b>Student Id : </b>11952
                  </p>

                  <p>
                    <b>Student Name : </b>Shaji
                  </p>

                  <p>
                    <b>Student Email : </b>b.shaji245gmail.com
                  </p>
                </div>
              </div>

              <label
                for="listofStudents"
                class="form-label"
                style={{ marginTop: "5%" }}
              >
                <b>List of Students :</b>
              </label>

              <table class="table table-striped">
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

              <a href="##" class="btn btn-primary" style={{ float: "right" }}>
                Print
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkSheet;
