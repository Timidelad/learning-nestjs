import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
    getHello(): string {
        return "Hello nestjs"
    }

    getName(): string {
        return "my name is timilehin"
    }

    getUserName(name: string): string {
        return `this user name is ${name}`
    }

    welcomeUser(name: string): string {
        return `Welcome to the nest family ${name}`
    }
}
