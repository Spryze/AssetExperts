/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  staff: ['admin', 'staff'],
  user: ['admin', 'staff', 'user'],
  guest: ['admin', 'staff', 'user'],
  onlyGuest: [],
};

export default authRoles;
