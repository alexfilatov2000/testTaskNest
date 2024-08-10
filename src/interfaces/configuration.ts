import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export interface Config {
  port: number;
  database: DatabaseConfig;
  rootUser: RootUser;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: 'postgres';
  logging: boolean;
}

export interface RootUser {
  email: string;
  password: string;
}

export class UuidIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id!: string;
}
