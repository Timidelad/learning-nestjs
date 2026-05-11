import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class registerDto {
    @IsEmail({}, { message: "please provide a valid email" })
    email!: string

    @IsNotEmpty({ message: "please provide a name" })
    @IsString({ message: "name must be a string" })
    name!: string

    @IsNotEmpty({ message: "please provide a password" })
    password!: string
}