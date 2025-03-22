import React from "react";
import { useNavigate } from "react-router-dom";
import homepage from "../assets/homepage.png";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleStartManagingRewards = () => {
    navigate("/login");
  };

  return (
    <div className="home-container container mt-5">
      <h1 className="home-heading">Welcome to the Reward System Dashboard</h1>
      <p className="lead mt-4">
        The Reward System Dashboard helps users track, manage, and redeem
        rewards seamlessly. It enhances user engagement by displaying points,
        achievements, and redemption options.
      </p>

      <div className="text-center">
        <img
          src={homepage}
          alt="Reward System"
          className="home-image img-fluid mt-4"
        />
      </div>

      <section>
        <h2 className="mt-5">Key Features</h2>
        <ul>
          <li>
            <strong>Reward Tracking:</strong> Monitor points, milestones, and
            achievements.
          </li>
          <li>
            <strong>Redemption Options:</strong> Browse and redeem rewards
            effortlessly.
          </li>
          <li>
            <strong>User Engagement:</strong> Enhance motivation with
            goal-oriented rewards.
          </li>
        </ul>
      </section>

      <section className="mt-5">
        <h2>Getting Started</h2>
        <p>
          Begin by exploring your reward points and available redemption
          options. Track achievements and maximize your benefits with our
          streamlined reward management system.
        </p>
        <button
          className="btn btn-primary btn-lg mt-3"
          onClick={handleStartManagingRewards}
        >
          Start Managing Rewards
        </button>
      </section>

      <section className="mt-5 mb-5">
        <h2>About the Reward System</h2>
        <p>
          Our Reward System is designed to recognize and encourage user
          engagement. Earn points for activities, unlock achievements, and
          redeem exclusive rewards tailored to your preferences. The Reward
          System Dashboard helps users track, manage, and redeem rewards
          seamlessly. It enhances user engagement by displaying points,
          achievements, and redemption options.
        </p>
      </section>
    </div>
  );
};

export default Home;
