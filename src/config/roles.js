const allRoles = {
  user: ['getCategories', 'getProducts'],
  admin: ['getUsers', 'manageUsers', 'manageCategory', 'getCategories', 'manageProduct', 'getProducts'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
