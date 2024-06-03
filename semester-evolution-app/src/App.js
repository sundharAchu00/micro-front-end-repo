import LandingPage from "./common/LandingPage";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LoginComp from "./login/LoginComp";
import AdminView from "./admin/AdminView";

import "./styles/adminLanding.css";

import StudentDashboard from "./student/StudentDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/:user" element={<LoginComp />} />
          <Route path="/dashboard/view/:user" element={<AdminView />} />
          <Route path="/dashboard/:user" element={<StudentDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
