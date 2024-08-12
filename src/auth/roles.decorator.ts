import { SetMetadata } from '@nestjs/common';
import { RoleName } from '../roles/dto/role.dto';
import { RoleAction } from '@src/auth/dto/auth.dto';
import { RoleOptionsMetadata } from '@src/auth/dto/auth.dto';

export const roleKey = 'roles';

export const Roles = (
  roles: RoleName[],
  action: RoleAction = RoleAction.All,
  options?: {
    model: RoleOptionsMetadata['model'];
    uuidPkField: RoleOptionsMetadata['uuidPkField'];
    reqPath: RoleOptionsMetadata['reqPath'];
    userIdField: RoleOptionsMetadata['userIdField'];
  }
) => SetMetadata(roleKey, { roles, action, options });
