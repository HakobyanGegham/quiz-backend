import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';
import {UserModule} from "../user/user.module";
import {AuthController} from "./auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./jwt/jwt.constants";
import {JwtStrategy} from "./jwt/jwt.strategy";

@Module({
    controllers: [AuthController],
    imports: [UserModule, PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600s' },
        }),],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
