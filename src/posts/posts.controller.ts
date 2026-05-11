import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post-dto';
import { PostExistsPipe } from './pipes/postexists.pipe';
import { Post as PostEntity } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post-dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    // get post
    @Get()
    async findAll(): Promise<PostEntity[]> {
        return this.postsService.findAll();
    }

    // create post
    @Post('create')
    async createNewPost(@Body() newPost: CreatePostDto): Promise<PostEntity> {
        return this.postsService.createNewPost(newPost)
    }

    // update post
    @Put('update/:id')
    async updatePost(@Body() updatePostData: UpdatePostDto, @Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
        return this.postsService.updatePost(id, updatePostData)
    }

    // remove post
    @Delete('delete/:id')
    async removePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
        this.postsService.removePost(id)
    }
}
