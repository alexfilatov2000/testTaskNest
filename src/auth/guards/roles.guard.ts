import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { roleKey } from '@src/auth/roles.decorator';
import { Reflector } from '@nestjs/core';
import { RoleAction, RoleMetadata } from '@src/auth/dto/auth.dto';
import { RoleName } from '@src/roles/dto/role.dto';
import _ from 'lodash';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<RoleMetadata>(roleKey, context.getHandler());

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const roleName = request.user.roleName;
    const userId = request.user.userId;

    const isRoleAcceptable = requiredRoles.roles.includes(roleName);

    if (!isRoleAcceptable) {
      return false;
    }

    if (roleName === RoleName.Admin) {
      return true;
    }

    let result;

    switch (requiredRoles.action) {
      case RoleAction.All:
      case RoleAction.Read:
        result = true;
        break;
      case RoleAction.Delete:
      case RoleAction.Create:
      case RoleAction.Update:
        if (requiredRoles.userIdPath) {
          const value = _.get(request, requiredRoles.userIdPath);
          result = value === userId;
        } else {
          result = false;
        }
        break;
      default:
        result = false;
    }

    return result;
  }
}
