import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import UserManagement from "./pages/RewardsManagement";
import RoleManagement from "./pages/RewardManagement";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: "20px" }}>
          <ul style={{ display: "flex", listStyleType: "none", gap: "20px" }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/dashboard">Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/user-dashboard">User Dashboard</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rewards" element={<UserManagement />} />
            <Route path="/reward-roles" element={<RoleManagement />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
