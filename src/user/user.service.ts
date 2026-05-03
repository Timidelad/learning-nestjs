import { Injectable, NotFoundException } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {
    constructor(private readonly helloService: HelloService) { }
    users() {
        return [
            {
                id: 1,
                name: 'timi'
            },
            {
                id: 2,
                name: 'ade'
            },
            {
                id: 3,
                name: 'yemi'
            }
        ]
    }

    getUserById(id: number) {
        const user = this.users().find(user => user.id === id);
        if (!user) throw new NotFoundException('user not found')
        return user
    }

    welcomeUser(id: number) {
        const user = this.getUserById(id);
        return this.helloService.welcomeUser(user?.name)
    }

}
