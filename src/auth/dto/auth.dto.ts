import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleName } from '@src/roles/dto/role.dto';
import { User } from '@src/users/user.entity';
import { Post } from '@src/posts/post.entity';

export class LoginDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty()
  name?: string;
}

export enum RoleAction {
  Read = 'read',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
  All = 'all',
}

export interface RoleMetadata {
  roles: RoleName[];
  action?: RoleAction;
  options?: RoleOptionsMetadata;
}

export interface RoleOptionsMetadata {
  model: typeof User | typeof Post;
  uuidPkField: 'id';
  reqPath: 'params.id';
  userIdField: 'id' | 'userId';
}

export interface JwtPayload {
  userId: string;
  roleName: RoleName;
  iat: number;
  exp: number;
}
