const allRoles = {
  user: ['getCategories'],
  admin: ['getUsers', 'manageUsers', 'manageCategory', 'getCategories'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
