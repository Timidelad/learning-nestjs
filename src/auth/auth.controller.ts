import { Body, Controller, Post } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService: AuthService) { }

    @Post('create')
    createUser(@Body() registerDto: registerDto) {
        return this.AuthService.createUser(registerDto)
    }

    @Post('login')
    loginUser(@Body() userInfo: loginDto) {
        return this.AuthService.loginUser(userInfo)
    }

    @Post('refresh')
    refreshToken(@Body('refreshToken') refreshToken: string) {
        return this.AuthService.refreshToken(refreshToken)
    }
}
