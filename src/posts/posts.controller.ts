import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post-dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    findAllPosts(@Query('search') search?: string): PostInterface[] {
        const extractedPosts = this.postsService.findAll();

        if (search) {
            return extractedPosts.filter(singlePost => singlePost.title.toLowerCase().includes(search.toLowerCase()));
        }
        return extractedPosts;
    }

    @Get(':id')
    findPostById(@Param('id', ParseIntPipe) id: number): PostInterface {
        return this.postsService.findOneById(id);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    createPost(@Body() PostData: CreatePostDto): PostInterface {
        return this.postsService.createPost(PostData)
    }
}
