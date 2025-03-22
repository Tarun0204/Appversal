import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import RoleForm from "../components/RewardForm";
import { fetchRoles, addRole, updateRole, deleteRole } from "../mockApi";

const RewardManagement = () => {
  const [roles, setRoles] = useState([]);
  const [editingRole, setEditingRole] = useState(null);

  const allPermissions = ["Add", "Update", "Reedem"];

  useEffect(() => {
    const getRoles = async () => {
      const fetchedRoles = await fetchRoles();
      setRoles(fetchedRoles);
    };
    getRoles();
  }, []);

  const handleSave = async (role) => {
    try {
      if (editingRole) {
        await updateRole(role);
        setRoles(roles.map((r) => (r.name === editingRole.name ? role : r)));
        setEditingRole(null);
        toast.success("Reward updated successfully!");
      } else {
        await addRole(role);
        setRoles([...roles, role]);
        toast.success("Reward added successfully!");
      }
    } catch (error) {
      toast.error("Error saving role!");
    }
  };

  const handleEdit = (index) => {
    setEditingRole(roles[index]);
  };

  const handleDelete = async (index) => {
    try {
      const roleToDelete = roles[index];
      await deleteRole(roleToDelete.name);
      const updatedRoles = roles.filter((role, i) => i !== index);
      setRoles(updatedRoles);
      toast.success("Reward deleted successfully!");
    } catch (error) {
      toast.error("Error deleting role!");
    }
  };

  return (
    <div className="container">
      <h1>Rewards Management</h1>
      <RoleForm
        onSave={handleSave}
        role={editingRole}
        permissions={allPermissions}
      />
      <h2 className="mt-4">Rewards List</h2>
      {roles.length === 0 ? (
        <p>No rewards added yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Reward</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr key={index}>
                  <td>{role.name}</td>
                  <td>{role.permissions.join(", ")}</td>
                  <td>
                    <div className="button-group">
                      <button
                        className="btn btn-warning btn-sm mx-1"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm mx-1"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RewardManagement;
