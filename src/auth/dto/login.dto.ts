import { IsEmail, IsNotEmpty, } from "class-validator";

export class loginDto {
    @IsEmail({}, { message: "please provide a valid email" })
    email!: string

    @IsNotEmpty({ message: "please provide a password" })
    password!: string
}