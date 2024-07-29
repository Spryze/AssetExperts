/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  staff: ['admin', 'staff'],
  user: ['admin', 'staff', 'User'],
  guest: ['admin', 'staff', 'user'],
  onlyGuest: [],
};

export default authRoles;
