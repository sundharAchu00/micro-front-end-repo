import axios from "axios";

const ADMIN_BASE_URL = "http://localhost:1100/admin/";
const STAFF_BASE_URL = "http://localhost:1100/staff/";
const STUDENT_BASE_URL = "http://localhost:1100/student/";

export function login(email, password, user) {
  console.log(user, email, password);
  if (user === "admin") {
    return axios.post(
      `${ADMIN_BASE_URL}login?email=${email}&password=${password}`
    );
  }
  console.log("user login");
  return axios.get(
    `${STAFF_BASE_URL}login?email=${email}&password=${password}`
  );
}

export function studentLogin(email, password) {
  console.log(email, password);

  return axios.get(
    `http://localhost:1100/student/login?email=${email}&password=${password}`
  );
}

export function studentUpdatePassword(newPassword, Student) {
  console.log(newPassword, Student);

  return axios.put(
    `${STUDENT_BASE_URL}updatePassword?newPassword=${newPassword}`,
    Student
  );
}

export function getStudnetSubjects(studentId) {
  console.log(studentId);
  return axios.get(`${ADMIN_BASE_URL}get/student/subjects?stuId=` + studentId);
}

export function getAllSubjectOfStudent(studentId) {
  console.log(studentId);
  return axios.get(
    `${STUDENT_BASE_URL}get/student/subjects?stuId=${studentId}`
  );
}

export function overallResult(studentId) {
  return axios.get(`${ADMIN_BASE_URL}getResult?stuId=${studentId}`);
}

export function deleteStaff(staffId, adminId) {
  return axios.delete(
    `${ADMIN_BASE_URL}removeStaff?staffId=${staffId}&adminId=${adminId}`
  );
}

export function deleteStudent(studentId) {
  return axios.delete(`${ADMIN_BASE_URL}removeStudent?studentId=${studentId}`);
}
