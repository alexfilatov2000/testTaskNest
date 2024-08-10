import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleName } from '@src/roles/dto/role.dto';

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
  action: RoleAction;
  userIdPath: string;
}
