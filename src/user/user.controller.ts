import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getUser() {
        return this.userService.users()
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserById(id)
    }

    @Get('welcome/:id')
    welcomeUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.welcomeUser(id)
    }
}
