import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
        constructor(private readonly userService: UsersService) {}
    async signup(userData) {
        return await this.userService.create(userData);
    }
}

