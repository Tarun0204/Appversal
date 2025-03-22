import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const RewardsManagementDashboard = () => {
  const [rewards, setRewards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedBy, setSortedBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [rewardsPerPage] = useState(5);
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [newReward, setNewReward] = useState({
    id: null,
    name: "",
    points: 0,
    status: "Active",
  });

  useEffect(() => {
    setRewards([
      { id: 1, name: "Amazon Gift Card", points: 500, status: "Active" },
      { id: 2, name: "Spotify Premium", points: 300, status: "Inactive" },
    ]);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    toast.success("You have logged out successfully!");
    window.location.href = "/login";
  };

  const handleSort = (sortBy) => {
    setSortedBy(sortBy);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditReward = (reward) => {
    setNewReward(reward);
    setShowAddRewardModal(true);
  };

  const handleUpdateReward = (e) => {
    e.preventDefault();
    const updatedRewards = rewards.map((reward) =>
      reward.id === newReward.id ? { ...reward, ...newReward } : reward
    );
    setRewards(updatedRewards);
    setNewReward({ id: null, name: "", points: 0, status: "Active" });
    setShowAddRewardModal(false);
    toast.success("Reward updated successfully!");
  };

  const handleAddReward = (e) => {
    e.preventDefault();
    const newRewardWithId = { ...newReward, id: rewards.length + 1 };
    setRewards([...rewards, newRewardWithId]);
    setNewReward({ id: null, name: "", points: 0, status: "Active" });
    setShowAddRewardModal(false);
    toast.success("Reward added successfully!");
  };

  const handleDeleteReward = (id) => {
    const updatedRewards = rewards.filter((reward) => reward.id !== id);
    setRewards(updatedRewards);
    toast.success("Reward deleted successfully!");
  };

  const sortRewards = (rewards) => {
    return rewards.sort((a, b) => {
      if (sortedBy === "name") return a.name.localeCompare(b.name);
      if (sortedBy === "points") return a.points - b.points;
      return 0;
    });
  };

  const filteredRewards = rewards.filter((reward) =>
    reward.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastReward = currentPage * rewardsPerPage;
  const indexOfFirstReward = indexOfLastReward - rewardsPerPage;
  const currentRewards = filteredRewards.slice(
    indexOfFirstReward,
    indexOfLastReward
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h2>Rewards Management Dashboard</h2>
      <p>Manage and track your rewards efficiently.</p>

      <input
        type="text"
        placeholder="Search rewards"
        className="form-control mb-3"
        onChange={handleSearchChange}
        value={searchTerm}
      />

      <button
        className="btn btn-success mb-3"
        onClick={() => setShowAddRewardModal(!showAddRewardModal)}
      >
        {showAddRewardModal ? "Close Form" : "Add Reward"}
      </button>

      {showAddRewardModal && (
        <div className="mb-3">
          <h3>{newReward.id ? "Update Reward" : "Add New Reward"}</h3>
          <form onSubmit={newReward.id ? handleUpdateReward : handleAddReward}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Reward Name"
              value={newReward.name}
              onChange={(e) =>
                setNewReward({ ...newReward, name: e.target.value })
              }
              required
            />

            <input
              type="number"
              className="form-control mb-2"
              placeholder="Points"
              value={newReward.points}
              onChange={(e) =>
                setNewReward({ ...newReward, points: parseInt(e.target.value) })
              }
              required
            />

            <select
              className="form-control mb-2"
              value={newReward.status}
              onChange={(e) =>
                setNewReward({ ...newReward, status: e.target.value })
              }
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button type="submit" className="btn btn-primary">
              {newReward.id ? "Update Reward" : "Add Reward"}
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={() => setShowAddRewardModal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortRewards(currentRewards).map((reward) => (
            <tr key={reward.id}>
              <td>{reward.name}</td>
              <td>{reward.points}</td>
              <td>{reward.status}</td>
              <td>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleEditReward(reward)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteReward(reward.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-warning" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default RewardsManagementDashboard;
