import { IsNotEmpty, IsString, MinLength, } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    title!: string

    @IsNotEmpty({ message: 'Content is required' })
    @IsString({ message: 'Content must be a string' })
    @MinLength(10, { message: 'Content must be at least 10 characters long' })
    content!: string

    @IsNotEmpty({ message: 'Author name is required' })
    @IsString({ message: 'Author name must be a string' })
    @MinLength(3, { message: 'Author name must be at least 3 characters long' })
    authorName!: string
}