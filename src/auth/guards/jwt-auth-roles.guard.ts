import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';

@Injectable()
export class JwtAuthRolesGuard implements CanActivate {
  constructor(
    private readonly jwtAuthGuard: JwtAuthGuard,
    private readonly rolesGuard: RolesGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivateJwt = await this.jwtAuthGuard.canActivate(context);
    const canActivateRoles = await this.rolesGuard.canActivate(context);
    return canActivateJwt && canActivateRoles;
  }
}
