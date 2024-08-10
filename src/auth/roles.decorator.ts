import { SetMetadata } from '@nestjs/common';
import { RoleName } from '../roles/dto/role.dto';
import { RoleAction } from '@src/auth/dto/auth.dto';

export const roleKey = 'roles';
export const Roles = (roles: RoleName[], action: RoleAction = RoleAction.All, userIdPath?: string) =>
  SetMetadata(roleKey, { roles, action, userIdPath });
