import {Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import CreateUserDto from "../user/create-user.dto";
import {User} from "../user/user.schema";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private jwtService: JwtService) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        return await this.userService.findOne(email, password);
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        const newUser = await this.userService.createUser(createUserDto);

        return newUser;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user._id };
        return {
            firstName: user.firstName,
            lastName:user.lastName,
            email: user.email,
            role: user.role,
            token: this.jwtService.sign(payload),
        };
    }
}
