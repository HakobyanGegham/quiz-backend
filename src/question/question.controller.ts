import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {QuestionService} from "./question.service";
import CreateQuestionDto from "./create-question.dto";

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {
    }

    @Get()
    async getQuestions() {
      return this.questionService.getQuestions();
    }

    @Post()
    async createUpdateQuestion(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.createQuestion(createQuestionDto);
    }

    @Get(':id')
    async getQuestion(@Param() params) {
        return this.questionService.getQuestion(params.id);
    }

    @Post(':id')
    async updateQuestion(@Param() params, @Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.updateQuestion(params.id, createQuestionDto);
    }
}
