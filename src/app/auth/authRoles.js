/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  staff: ['admin', 'staff'],
  user: ['admin', 'staff', 'user'],
  guest: ['admin', 'staff', 'user',"guest"],
  onlyGuest: [],
};

export default authRoles;
