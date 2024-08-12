import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthRolesGuard } from '@src/auth/guards/jwt-auth-roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@src/auth/roles.decorator';
import { RoleName } from '@src/roles/dto/role.dto';
import { PostAttributes } from '@src/posts/post.entity';
import { PostsService } from '@src/posts/posts.service';
import { CreatePostDto, UpdatePostDto } from '@src/posts/dto/posts.dto';
import { JwtPayload, RoleAction } from '@src/auth/dto/auth.dto';
import { UuidIdDto } from '@src/interfaces/configuration';
import { Post as PostEntity } from './post.entity';

@UseGuards(JwtAuthRolesGuard)
@ApiTags('posts')
@Controller('posts')
@ApiBearerAuth()
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Roles([RoleName.User, RoleName.Admin])
  @Get(':id')
  async findOnePost(@Param() { id }: UuidIdDto): Promise<PostAttributes> {
    const post = await this.postsService.findOneByIdOrThrow(id);
    return post.toJSON();
  }

  @Roles([RoleName.User, RoleName.Admin])
  @Get()
  async findAllPosts(): Promise<PostAttributes[]> {
    return this.postsService.findAllPosts();
  }

  @Roles([RoleName.User, RoleName.Admin])
  @Post()
  async createPost(@Body() body: CreatePostDto, @Request() { user }: { user: JwtPayload }): Promise<PostAttributes> {
    return this.postsService.createPost(body, user.userId);
  }

  @Roles([RoleName.User, RoleName.Admin], RoleAction.Update, {
    model: PostEntity,
    uuidPkField: 'id',
    reqPath: 'params.id',
    userIdField: 'userId',
  })
  @Patch(':id')
  async updatePost(@Param() { id }: UuidIdDto, @Body() body: UpdatePostDto): Promise<PostAttributes> {
    return this.postsService.updatePost(id, body);
  }

  @Roles([RoleName.User, RoleName.Admin], RoleAction.Update, {
    model: PostEntity,
    uuidPkField: 'id',
    reqPath: 'params.id',
    userIdField: 'userId',
  })
  @Delete(':id')
  async deletePost(@Param() { id }: UuidIdDto): Promise<string> {
    await this.postsService.deletePost(id);
    return 'ok';
  }
}
