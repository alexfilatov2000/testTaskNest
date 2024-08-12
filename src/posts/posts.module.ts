import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from '@src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '@src/posts/post.entity';

@Module({
  imports: [AuthModule, SequelizeModule.forFeature([Post])],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
