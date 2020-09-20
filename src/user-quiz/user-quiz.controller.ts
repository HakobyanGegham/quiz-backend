import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {UserQuizService} from "./user-quiz.service";
import {AuthGuard} from "@nestjs/passport";
import CreateAnswerDto from "./create-answer.dto";

@Controller('user-quiz')
export class UserQuizController {
    constructor(private readonly userQuizService: UserQuizService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('start')
    startQuiz(@Req() req) {
        return this.userQuizService.startQuiz(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('answer')
    async saveAnswer(@Body() createAnswerDto: CreateAnswerDto) {
        const {message, userQuiz} = await this.userQuizService.saveAnswer(createAnswerDto);
        const {isComplete, question} = await this.userQuizService.getNextQuestion(userQuiz);

        return {message: message, isComplete, question};
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id/result')
    getResult(@Param() params) {
        return this.userQuizService.getResult(params.id);
    }
}
