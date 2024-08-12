import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post, PostAttributes } from '@src/posts/post.entity';
import { CreatePostDto, UpdatePostDto } from '@src/posts/dto/posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post
  ) {}

  async findOneByIdOrThrow(postId: string): Promise<Post> {
    const post = await Post.findByPk(postId);

    if (!post) {
      throw new HttpException('Post entry does not exist.', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async createPost(data: CreatePostDto, userId: string): Promise<PostAttributes> {
    const post = await this.postModel.create({
      ...data,
      userId: userId,
    });

    return post.toJSON();
  }

  async findAllPosts(): Promise<PostAttributes[]> {
    const posts = await Post.findAll();

    return posts.map((p) => p.toJSON());
  }

  async updatePost(id: string, data: UpdatePostDto): Promise<PostAttributes> {
    const post = await this.findOneByIdOrThrow(id);

    const updatedPost = (await post.update(data)) as Post;

    return updatedPost.toJSON();
  }

  async deletePost(id: string): Promise<void> {
    const post = await this.findOneByIdOrThrow(id);
    await post.destroy();
  }
}
