import { UUIDV4 } from 'sequelize';
import {
  Column,
  CreatedAt,
  Default,
  DeletedAt,
  IsUUID,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { RoleName } from '@src/roles/dto/role.dto';

@Scopes(() => ({}))
@Table({
  timestamps: true,
  paranoid: true,
  freezeTableName: true,
  tableName: 'Roles',
})
export class Role extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(UUIDV4)
  @Column
  id!: string;

  @Unique
  @Column
  name!: RoleName;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt?: Date;

  toJSON() {
    return super.toJSON();
  }
}

export type RoleAttributes = {
  id: string;
  name: RoleName;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type RoleCreationAttributes = RoleAttributes;
