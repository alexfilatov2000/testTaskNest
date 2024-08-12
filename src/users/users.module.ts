import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { RolesModule } from '@src/roles/roles.module';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), RolesModule, forwardRef(() => AuthModule)],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
