import {BadRequestException, forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from 'mongoose';
import DateUtil from "../util/date-util";
import {UserQuiz} from "./user-quiz.schema";
import CreateAnswerDto from "./create-answer.dto";
import {QuestionService} from "../question/question.service";
import UserQuizAnswer from "./user-quiz-answer.dto";

@Injectable()
export class UserQuizService {
    private quizQuestionCount = 5;

    constructor(@InjectModel(UserQuiz.name) private quizModel: Model<UserQuiz>,
                @Inject(forwardRef(() => QuestionService))
                private readonly questionService: QuestionService,
                private readonly dateUtil: DateUtil) {
    }

    async startQuiz(userId: string) {
        try {
            const quiz = await this.quizModel.findOne({userId, isComplete: false});
            if (quiz) {
                return quiz;
            }

            return this.createQuiz(userId);
        } catch (e) {
            throw new BadRequestException('Can not start quiz.')
        }
    }

    /**
     * Creates user quiz
     *
     * @param userId
     */
    createQuiz(userId: string) {
        const date = new Date();

        const userQuiz = new this.quizModel({
            _id: Types.ObjectId(),
            createdAt: this.dateUtil.getTimestampFormattedDate(date),
            updatedAt: this.dateUtil.getTimestampFormattedDate(date),
            userId,
            score: 0,
            isComplete: false
        });

        return userQuiz.save();
    }

    async getQuizQuestionIds(quizId: string) {
        const userQuiz = await this.quizModel.findById(quizId);

        if (!userQuiz) {
            throw new NotFoundException('Quiz not found.');
        }

        const questionIds = [];
        for (const i in userQuiz.answers) {
            if (!userQuiz.answers.hasOwnProperty(i)) {
                continue;
            }
            questionIds.push(userQuiz.answers[i].questionId);
        }

        return questionIds;
    }

    async saveAnswer(createAnswerDto: CreateAnswerDto) {
        const userQuiz = await this.quizModel.findById(createAnswerDto.quizId);
        if (!userQuiz) {
            throw new NotFoundException('User quiz not found.');
        }

        const question = await this.questionService.findById(createAnswerDto.questionId);
        const option = question.options.find(option => String(option._id) === String(createAnswerDto.answerId.trim()));

        const userQuizAnswer: UserQuizAnswer = {
            questionId: question._id,
            questionContent: question.content,
            answerId: option._id,
            answerContent: option.content,
            isCorrect: option.isCorrect
        };

        userQuiz.answers.push(userQuizAnswer);
        let message: string;
        if (option.isCorrect) {
            userQuiz.score = userQuiz.score + question.score;
            message = 'Your answer is correct';
        } else {
            message = 'Your answer is incorrect';
        }
        userQuiz.save();
        return {message, userQuiz};
    }

    checkIfQuizCompleted(userQuiz: UserQuiz): boolean {
        return userQuiz.answers.length >= this.quizQuestionCount;
    }

    /**
     * Returns new random question if quiz is not complete
     *
     * @param userQuiz
     */
    async getNextQuestion(userQuiz: UserQuiz) {
        const isComplete = this.checkIfQuizCompleted(userQuiz);
        let question = null;
        if (!isComplete) {
            question = await this.questionService.getRandomQuestion(userQuiz._id);
        }

        return {isComplete, question};
    }

    /**
     * Returns result of user quiz
     *
     * @param quizId
     */
    async getResult(quizId: string) {
        const userQuiz = await this.quizModel.findById(quizId);

        if (!userQuiz) {
            throw new NotFoundException('Quiz not found.');
        }

        return {id: userQuiz._id, score: userQuiz.score};
    }
}
