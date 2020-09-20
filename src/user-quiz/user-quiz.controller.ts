import {Controller, Get, Headers, Req, UseGuards} from '@nestjs/common';
import {UserQuizService} from "./user-quiz.service";
import {AuthGuard} from "@nestjs/passport";

@Controller('user-quiz')
export class UserQuizController {
    constructor(private readonly userQuizService: UserQuizService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('start')
    startQuiz(@Req() req) {
      console.log(req.user);
    }
}
