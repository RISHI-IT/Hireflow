import { Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Jobs from "./Pages/Jobs";
import JobDetails from "./Pages/JobDetails";

import CandidateDashboard from "./Pages/CandidateDashboard";
import Applications from "./Pages/Applications";
import Profile from "./Pages/Profile";

import RecruiterDashboard from "./Pages/RecruiterDashboard";
import PostJob from "./Pages/PostJob";
import RecruiterJobs from "./Pages/RecruiterJobs";
import RecruiterCandidates from "./Pages/RecruiterCandidates";

function App() {
  return (
    <Routes>

      {/* Public */}

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/jobs" element={<Jobs />} />

      <Route path="/jobs/:id" element={<JobDetails />} />


      {/* Candidate */}

      <Route
        path="/candidate/dashboard"
        element={<CandidateDashboard />}
      />

      <Route
        path="/applications"
        element={<Applications />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />


      {/* Recruiter */}

      <Route
        path="/recruiter/dashboard"
        element={<RecruiterDashboard />}
      />

      <Route
        path="/recruiter/jobs"
        element={<RecruiterJobs />}
      />

      <Route
        path="/recruiter/jobs/new"
        element={<PostJob />}
      />

      <Route
        path="/recruiter/candidates"
        element={<RecruiterCandidates />}
      />

    </Routes>
  );
}

export default App;