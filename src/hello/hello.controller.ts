import { Controller, Get, Param, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
    // dependency injection
    constructor(private readonly helloService: HelloService) { }
    @Get()
    getHello(): string {
        return this.helloService.getHello()
    }

    @Get('name')
    getName(): string {
        return this.helloService.getName()
    }

    @Get('user/:name')
    getUserName(@Param('name') name: string): string {
        return this.helloService.getUserName(name)
    }

    @Get('query')
    getQuery(@Query('name') name: string): string {
        return this.helloService.getUserName(name)
    }
}
