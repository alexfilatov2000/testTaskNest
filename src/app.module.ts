import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseConfig } from './interfaces/configuration';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRoot({
      ...(configuration().database as DatabaseConfig),
      models: [User, Role],
    }),
    AuthModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
