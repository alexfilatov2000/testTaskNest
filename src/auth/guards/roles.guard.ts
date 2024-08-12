import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { roleKey } from '@src/auth/roles.decorator';
import { Reflector } from '@nestjs/core';
import { RoleAction, RoleMetadata, RoleOptionsMetadata } from '@src/auth/dto/auth.dto';
import { RoleName } from '@src/roles/dto/role.dto';
import _ from 'lodash';
import { ValidationService } from '@src/utils/validator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roleMetadata = this.reflector.get<RoleMetadata>(roleKey, context.getHandler());

    if (!roleMetadata) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const roleName = request.user.roleName;
    const userId = request.user.userId;

    const isRoleAcceptable = roleMetadata.roles.includes(roleName);

    if (!isRoleAcceptable) {
      return false;
    }

    if (roleName === RoleName.Admin) {
      return true;
    }

    let result;

    switch (roleMetadata.action) {
      case RoleAction.All:
      case RoleAction.Read:
        result = true;
        break;
      case RoleAction.Delete:
      case RoleAction.Create:
      case RoleAction.Update:
        result = await RolesGuard.checkUserOwnership(roleMetadata.options, userId, request);
        break;
      default:
        result = false;
    }

    return result;
  }

  private static async checkUserOwnership(
    options: RoleOptionsMetadata | undefined,
    userId: string,
    request: Request
  ): Promise<boolean> {
    if (!options) {
      return false;
    }

    const { reqPath, uuidPkField, model, userIdField } = options;
    const value = _.get(request, reqPath);

    await ValidationService.validateUuid(value);

    const resource = await (model as any).findOne({ where: { [uuidPkField]: value } });

    return (resource as any)?.[userIdField] === userId;
  }
}
