import React, { useEffect, useState } from "react";
import logo from "../logo.png";

const ProfilePage = ({ user }) => {
  let [currentUser, setCurrentUser] = useState({});
  let [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    console.log(user);
    if (user === "staff") {
      console.log("staff");
      //   console.log(JSON.parse(sessionStorage.getItem("staff")));
      setCurrentUser(JSON.parse(sessionStorage.getItem("staff")));
      setUserProfile(JSON.parse(sessionStorage.getItem("staffProfile")));
    } else {
      console.log("student");
      setCurrentUser(JSON.parse(sessionStorage.getItem("student")));
      setUserProfile(JSON.parse(sessionStorage.getItem("studentProfile")));
    }
  }, [user]);

  console.log(currentUser);
  console.log(userProfile);

  return (
    <>
      <div
        className="container d-flex justify-content-center"
        style={{ marginTop: "5%" }}
      >
        <div className="card w-50">
          <div className="card-body shadow w-100">
            <h5 className="card-title text-center">Profile Details</h5>
            <div className="mt-3">
              {user === "staff" ? (
                <img
                  src={
                    userProfile.staffProfilePicture !== null
                      ? `data:image/jpeg;base64,${userProfile.staffProfilePicture}`
                      : logo
                  }
                  className="img-fluid mx-auto d-block"
                  id="studentProfile"
                  alt=""
                />
              ) : (
                <img
                  src={
                    userProfile.stuProfilePicture !== null
                      ? `data:image/jpeg;base64,${userProfile.stuProfilePicture}`
                      : logo
                  }
                  className="img-fluid mx-auto d-block"
                  id="studentProfile"
                  alt=""
                />
              )}
              <h5 className="text-center mt-3">
                {user === "staff"
                  ? userProfile.staffName
                  : userProfile.studentName}
              </h5>
            </div>

            <div
              className="container d-flex justify-content-center "
              style={{ marginTop: "2%" }}
            >
              <div className="border-top pt-5">
                <p>
                  <b>{user === "staff" ? "Employee " : "Enrollment"} Id : </b>
                  {user === "staff"
                    ? `KCET100${currentUser.staffId}`
                    : `KCET200${currentUser.stuMapId}`}
                </p>
                <p>
                  <b>Name : </b>
                  {user === "staff"
                    ? userProfile.staffName
                    : userProfile.studentName}
                </p>
                <p>
                  <b>Email : </b>
                  {user === "staff"
                    ? userProfile.staffEmail
                    : userProfile.studentEmail}
                </p>
                {user !== "staff" && (
                  <p>
                    <b>Attendace percentage : </b>{" "}
                    {userProfile.stuAttPercentage}%
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
