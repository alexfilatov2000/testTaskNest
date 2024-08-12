import {
  Column,
  Model,
  Table,
  IsUUID,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
  Scopes,
  Unique,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import _ from 'lodash';
import { Role, RoleAttributes } from '@src/roles/roles.model';

@Scopes(() => ({
  role: {
    include: [
      {
        model: Role,
      },
    ],
  },
}))
@Table({
  timestamps: true,
  paranoid: true,
  freezeTableName: true,
  tableName: 'Users',
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(UUIDV4)
  @Column
  id!: string;

  @Unique
  @Column
  email!: string;

  @Column
  name?: string;

  @Column
  passwordHash!: string;

  @Column
  roleId!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt?: Date;

  @BelongsTo(() => Role, 'roleId')
  role!: Role;

  toJSON(): UserPublicAttributes {
    return {
      ...(_.omit(super.toJSON(), 'passwordHash') as UserPublicAttributes),
      role: this.role?.toJSON(),
    };
  }
}

export type UserAttributes = {
  id: string;
  email: string;
  roleId: string;
  passwordHash: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

interface RoleInterface {
  role?: RoleAttributes;
}

export type UserPublicAttributes = Omit<UserAttributes, 'passwordHash'> & RoleInterface;

export type UserCreationAttributes = Partial<Pick<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>> &
  Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;
