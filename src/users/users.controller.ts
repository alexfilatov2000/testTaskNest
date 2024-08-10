import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserBodyDto } from '@src/users/dto/users.dto';
import { Roles } from '@src/auth/roles.decorator';
import { UserPublicAttributes } from '@src/users/users.model';
import { UuidIdDto } from '@src/interfaces/configuration';
import { RoleName } from '@src/roles/dto/role.dto';
import { JwtAuthRolesGuard } from '@src/auth/guards/jwt-auth-roles.guard';
import { RoleAction } from '@src/auth/dto/auth.dto';

@UseGuards(JwtAuthRolesGuard)
@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOneUser(@Param() { id }: UuidIdDto): Promise<UserPublicAttributes> {
    const user = await this.usersService.findOneByIdOrThrow(id, ['role']);
    return user.toJSON();
  }

  @Roles([RoleName.User, RoleName.Admin])
  @Get()
  async findAllUsers(): Promise<UserPublicAttributes[]> {
    return this.usersService.findAll();
  }

  @Roles([RoleName.User, RoleName.Admin], RoleAction.Update, 'params.id')
  @Patch(':id')
  async updateUser(@Param() { id }: UuidIdDto, @Body() body: UpdateUserBodyDto) {
    return this.usersService.updateUser(id, body);
  }
  @Roles([RoleName.User, RoleName.Admin], RoleAction.Update, 'params.id')
  @Delete(':id')
  async deleteUser(@Param() { id }: UuidIdDto) {
    await this.usersService.deleteUser(id);
    return 'ok';
  }
}
