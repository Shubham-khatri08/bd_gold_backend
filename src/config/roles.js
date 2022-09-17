const allRoles = {
  user: ['getCategories', 'getProducts', 'getOrders'],
  admin: [
    'getUsers',
    'manageUsers',
    'manageCategory',
    'getCategories',
    'manageProduct',
    'getProducts',
    'manageOrder',
    'getOrders',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
