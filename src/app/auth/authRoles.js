/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  staff: ['admin', 'staff'],
  user: ['admin', 'staff', 'User', 'user'],
  guest: ['admin', 'staff', 'user',"guest"],
  onlyGuest: [],
};

export default authRoles;
