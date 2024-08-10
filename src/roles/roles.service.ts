import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '@src/roles/roles.model';
import { RoleName } from '@src/roles/dto/role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role
  ) {}

  async findOneByNameOrThrow(name: RoleName): Promise<Role> {
    const role = await this.roleModel.findOne({
      where: {
        name,
      },
    });

    if (!role) {
      throw new HttpException('Role entry does not exist.', HttpStatus.NOT_FOUND);
    }

    return role;
  }
}
