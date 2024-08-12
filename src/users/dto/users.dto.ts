import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;
}

export interface CreateUserRequest {
  email: string;
  passwordHash: string;
  name?: string;
}

export type UserScope = 'role';
