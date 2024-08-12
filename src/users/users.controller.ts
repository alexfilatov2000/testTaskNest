import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserBodyDto } from '@src/users/dto/users.dto';
import { Roles } from '@src/auth/roles.decorator';
import { User, UserPublicAttributes } from '@src/users/user.entity';
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

  @Roles([RoleName.User, RoleName.Admin])
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

  @Roles([RoleName.User, RoleName.Admin], RoleAction.Update, {
    model: User,
    uuidPkField: 'id',
    reqPath: 'params.id',
    userIdField: 'id',
  })
  @Patch(':id')
  async updateUser(@Param() { id }: UuidIdDto, @Body() body: UpdateUserBodyDto): Promise<UserPublicAttributes> {
    return this.usersService.updateUser(id, body);
  }
  @Roles([RoleName.User, RoleName.Admin], RoleAction.Update, {
    model: User,
    uuidPkField: 'id',
    reqPath: 'params.id',
    userIdField: 'id',
  })
  @Delete(':id')
  async deleteUser(@Param() { id }: UuidIdDto): Promise<string> {
    await this.usersService.deleteUser(id);
    return 'ok';
  }
}
