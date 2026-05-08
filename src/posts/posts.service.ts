import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { Post } from './interfaces/post.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';

@Injectable()
export class PostsService {


    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) { }

    async findAll(): Promise<Post[]> {
        return this.postRepository.find()
    }

    async findOnePost(id: number): Promise<Post> {
        const singlePost = await this.postRepository.findOneBy({ id });

        if (!singlePost) {
            throw new NotFoundException(`post with id ${id} is not found`)
        }

        return singlePost
    }

    async createNewPost(newPost: CreatePostDto): Promise<Post> {
        const newlyCreatedPost = this.postRepository.create({
            title: newPost.title,
            content: newPost.content,
            authorName: newPost.authorName
        });

        return this.postRepository.save(newlyCreatedPost)
    }

    // update post
    async updatePost(id: number, updatePostData: UpdatePostDto): Promise<Post> {
        const postExist = await this.postRepository.findOneBy({ id });

        if (!postExist) {
            throw new NotFoundException(`Post with id ${id} does not exist`)
        }

        if (updatePostData.authorName) {
            postExist.authorName = updatePostData.authorName
        }

        return this.postRepository.save(postExist)
    }

    // remove post
    async removePost(id: number): Promise<void> {
        const postToBeRemoved = await this.postRepository.findOneBy({ id });
        if (!postToBeRemoved) {
            throw new NotFoundException(`Post with id ${id} does not exist`)
        }

        await this.postRepository.remove(postToBeRemoved)
    }
}
