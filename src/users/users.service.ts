import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserPublicAttributes } from './user.entity';
import { CreateUserRequest, UpdateUserBodyDto } from '@src/users/dto/users.dto';
import { Role } from '@src/roles/roles.model';
import { RolesService } from '@src/roles/roles.service';
import { RoleName } from '@src/roles/dto/role.dto';
import { UserScope } from '@src/users/dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private rolesService: RolesService
  ) {}
  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: {
        email: email,
      },
      include: Role,
    });

    return user;
  }

  async findOneByIdOrThrow(userId: string, scopes: UserScope[] = []): Promise<User> {
    const user = await this.userModel.scope(scopes).findByPk(userId);

    if (!user) {
      throw new HttpException('User entry does not exist.', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findAll(): Promise<UserPublicAttributes[]> {
    const users = await this.userModel.findAll();
    return users.map((user) => user.toJSON());
  }

  async updateUser(id: string, data: UpdateUserBodyDto): Promise<UserPublicAttributes> {
    const user = await this.findOneByIdOrThrow(id);

    const updatedUser = (await user.update(data)) as User;

    return updatedUser.toJSON();
  }

  async createUser(data: CreateUserRequest): Promise<UserPublicAttributes> {
    const user = await this.findOneByEmail(data.email);

    if (user) {
      throw new HttpException('User entry already exist with this email.', HttpStatus.CONFLICT);
    }

    const role = await this.rolesService.findOneByNameOrThrow(RoleName.User);

    const createdUser = await User.create({ ...data, roleId: role.id });

    return createdUser.toJSON();
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.findOneByIdOrThrow(id);
    await user.destroy();
  }
}
