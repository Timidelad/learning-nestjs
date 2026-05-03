import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
    private posts: Post[] = [
        {
            id: 1,
            title: 'my first blog post',
            content: 'this is the content of my first blog post',
            authorName: 'Timi delad',
            createdAt: new Date(),
        },
        {
            id: 2,
            title: 'my second blog post',
            content: 'this is the content of my second blog post',
            authorName: 'Timi delad',
            createdAt: new Date(),
        }
    ]

    private getNextId(): number {
        const posts = this.posts;

        return posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
    }

    findAll(): Post[] {
        return this.posts;
    }

    findOneById(id: number): Post {
        const post = this.posts.find(singlePost => singlePost.id === id);

        if (!post) {
            throw new Error(`Post with ID ${id} not found`);
        }

        return post;
    }

    createPost(postData: Omit<Post, 'id' | 'createdAt'>): Post {
        const newPost: Post = {
            id: this.getNextId(),
            ...postData,
            createdAt: new Date(),
        };

        this.posts.push(newPost);

        return newPost;

    }
}
