import React, { useState, useEffect } from 'react';

const RewardForm = ({ role, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    permissions: [],
  });

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        permissions: role.permissions || [],
      });
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePermissionChange = (permission) => {
    setFormData((prevData) => {
      const newPermissions = [...prevData.permissions];
      if (newPermissions.includes(permission)) {
        return {
          ...prevData,
          permissions: newPermissions.filter((perm) => perm !== permission),
        };
      } else {
        return {
          ...prevData,
          permissions: [...newPermissions, permission],
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === '') {
      alert('Role name cannot be empty');
      return;
    }
    onSave(formData);
    setFormData({ name: '', permissions: [] });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{role ? 'Edit Reward' : 'Add Reward'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="roleName" className="form-label">Reward Name</label>
            <input
              type="text"
              className="form-control"
              id="roleName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Permissions</label>
            <div>
              {['Add', 'Update', 'Reedem'].map((permission) => (
                <div key={permission} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={permission}
                    checked={formData.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                  <label className="form-check-label" htmlFor={permission}>
                    {permission}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            {role ? 'Update Reward' : 'Save Reward'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RewardForm;
