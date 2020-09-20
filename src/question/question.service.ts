import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import DateUtil from "../util/date-util";
import {Question} from "./question.schema";
import CreateQuestionDto from "./create-question.dto";

@Injectable()
export class QuestionService {
    constructor(@InjectModel(Question.name) private questionModel: Model<Question>,
                private dateUtil: DateUtil) {
    }

    /**
     * Returns all questions
     */
    async getQuestions() {
        return await this.questionModel.find();
    }

    /**
     * Returns question by id
     *
     * @param _id
     */
    async getQuestion(_id: string) {
        try {
            return await this.questionModel.findById(_id);
        } catch (e) {
            throw new NotFoundException('Question not found.');
        }
    }

    /**
     * Creates new question
     *
     * @param createQuestionDto
     */
    async createQuestion(createQuestionDto: CreateQuestionDto) {
        try {
            const questionObj = Object.assign(createQuestionDto);
            const date = new Date();
            questionObj.createdAt = this.dateUtil.getTimestampFormattedDate(date);
            questionObj.updatedAt = this.dateUtil.getTimestampFormattedDate(date);
            const question = new this.questionModel(questionObj);
            return question.save();
        } catch (e) {
            throw new BadRequestException('Question is not created.')
        }
    }

    /**
     * Updates question by id
     *
     * @param _id
     * @param createQuestionDto
     */
    async updateQuestion(_id: string, createQuestionDto: CreateQuestionDto) {
        const existingQuestion = await this.questionModel.findById(_id);

        if (!existingQuestion) {
            throw new NotFoundException('Question is not found.');
        }

        try {
            const date = new Date();
            existingQuestion.content = createQuestionDto.content;
            existingQuestion.options = createQuestionDto.options;
            existingQuestion.updatedAt = this.dateUtil.getTimestampFormattedDate(date);
            existingQuestion.score = createQuestionDto.score;

            return existingQuestion.save();
        } catch (e) {
            throw new BadRequestException('Question is not updated.')
        }
    }
}
