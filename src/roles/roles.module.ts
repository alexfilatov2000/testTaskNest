import { Module } from '@nestjs/common';
import { Role } from './roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesService } from './roles.service';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
