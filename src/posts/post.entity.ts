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
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table({
  timestamps: true,
  paranoid: true,
  freezeTableName: true,
  tableName: 'Posts',
})
export class Post extends Model<PostAttributes, PostCreationAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(UUIDV4)
  @Column
  id!: string;

  @Column
  title!: string;

  @Column
  description?: string;

  @Column
  userId!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt?: Date;

  toJSON(): PostAttributes {
    return super.toJSON();
  }
}

export type PostAttributes = {
  id: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type PostCreationAttributes = Partial<Pick<PostAttributes, 'id' | 'createdAt' | 'updatedAt'>> &
  Omit<PostAttributes, 'id' | 'createdAt' | 'updatedAt'>;
