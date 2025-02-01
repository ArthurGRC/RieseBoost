import { CUSTOMER_ROLES } from '@/src/helpers/constants/enums';

const roleValidate = (necessaryRoles: string[], roles: string[]) => {
  if (!roles) return false;
  return roles.includes(CUSTOMER_ROLES.admin)
    ? true
    : necessaryRoles.every((necessaryRole) => roles.includes(necessaryRole));
};

export { roleValidate };
