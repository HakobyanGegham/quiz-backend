import {BadRequestException, forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from 'mongoose';
import DateUtil from "../util/date-util";
import {Question} from "./question.schema";
import CreateQuestionDto from "./create-question.dto";
import {UserQuizService} from "../user-quiz/user-quiz.service";

@Injectable()
export class QuestionService {
    constructor(@InjectModel(Question.name) private questionModel: Model<Question>,
                @Inject(forwardRef(() => UserQuizService))
                private readonly userQuizService,
                private readonly dateUtil: DateUtil
                ) {
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
            for (const i in createQuestionDto.options) {
                if (!createQuestionDto.options.hasOwnProperty(i)) {
                    continue;
                }
                createQuestionDto.options[i]._id = Types.ObjectId();
            }
            const questionObj = Object.assign(createQuestionDto);
            const date = new Date();
            questionObj.createdAt = this.dateUtil.getTimestampFormattedDate(date);
            questionObj.updatedAt = this.dateUtil.getTimestampFormattedDate(date);
            const question = new this.questionModel(questionObj);
            return question.save();
        } catch (e) {
            console.log(e);
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

    async getRandomQuestion(quizId: string): Promise<Question> {
        try {
            const quizQuestionIds = await this.userQuizService.getQuizQuestionIds(quizId);
            const allQuestionIds = await this.questionModel.find().distinct('_id');
            const difference = allQuestionIds.filter(x => !quizQuestionIds.includes(x));
            const randomId = difference[Math.floor((Math.random() * difference.length))];
            return await this.questionModel.findById(randomId);
        } catch (e) {
            throw new NotFoundException('Random question not found.');
        }
    }

    findById(questionId: string) {
        const question  =  this.questionModel.findById(questionId);

        if (!question) {
            throw new NotFoundException('Question not found.');
        }

        return question;
    }
}
