import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {QuestionService} from "./question.service";
import CreateQuestionDto from "./create-question.dto";

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {
    }

    @Get()
    getQuestions() {
      return this.questionService.getQuestions();
    }

    @Post()
    createUpdateQuestion(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.createQuestion(createQuestionDto);
    }

    @Get(':id')
    getQuestion(@Param() params) {
        return this.questionService.getQuestion(params.id);
    }

    @Post(':id')
    updateQuestion(@Param() params, @Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.updateQuestion(params.id, createQuestionDto);
    }

    @Get('random/:quizId')
    getRandomQuestion(@Param() params) {
        return this.questionService.getRandomQuestion(params.quizId);
    }
}
