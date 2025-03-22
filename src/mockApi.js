let roles = [
  { name: 'Amazon', permissions: ['Add', 'Update'] },
  { name: 'Flipkart', permissions: ['Add'] },
];

export const fetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(users), 1000);
  });
};

export const addUser = (newUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userWithId = { ...newUser, id: users.length + 1 };
      users.push(userWithId);
      resolve(userWithId);
    }, 1000);
  });
};

export const updateUser = (id, updatedData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      users = users.map((user) => (user.id === id ? { ...user, ...updatedData } : user));
      resolve({ id, ...updatedData });
    }, 1000);
  });
};

export const deleteUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      users = users.filter((user) => user.id !== id);
      resolve({ message: `User with ID ${id} deleted` });
    }, 1000);
  });
};

export const fetchRoles = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(roles), 1000);
  });
};

export const addRole = (newRole) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      roles.push(newRole);
      resolve(newRole);
    }, 1000);
  });
};

export const updateRole = (name, updatedData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      roles = roles.map((role) => (role.name === name ? { ...role, ...updatedData } : role));
      resolve({ name, ...updatedData });
    }, 1000);
  });
};

export const deleteRole = (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      roles = roles.filter((role) => role.name !== name);
      resolve({ message: `Role ${name} deleted` });
    }, 1000);
  });
};