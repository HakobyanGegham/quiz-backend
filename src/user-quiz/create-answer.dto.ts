import {IsNotEmpty} from 'class-validator';

export default class CreateAnswerDto {
    @IsNotEmpty()
    quizId: string;
    @IsNotEmpty()
    questionId: string;
    @IsNotEmpty()
    answerId: string;
}
