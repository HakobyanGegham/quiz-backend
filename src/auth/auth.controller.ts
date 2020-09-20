import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {User} from "../user/user.schema";
import {AuthGuard} from "@nestjs/passport";
import CreateUserDto from "../user/create-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.authService.register(createUserDto);
    }
}
