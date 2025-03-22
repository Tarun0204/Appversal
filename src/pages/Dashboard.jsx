import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("role");
    toast.success("You have logged out successfully!");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <h2>Reward Management Dashboard</h2>
      <p>Welcome to the Reward Management System, Admin!</p>

      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Reward Tracking</h5>
              <p className="card-text">
                Monitor points, achievements, and user rewards.
              </p>
              <Link to="/rewards" className="btn btn-primary">
                Manage Rewards
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Redemption Management</h5>
              <p className="card-text">
                Define and manage reward redemption options.
              </p>
              <Link to="/reward-roles" className="btn btn-primary">
                Manage Redemptions
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
