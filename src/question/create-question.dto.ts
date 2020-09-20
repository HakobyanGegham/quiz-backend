import {IsNotEmpty} from 'class-validator';

export default class CreateQuestionDto {
    _id?: string;
    @IsNotEmpty()
    content: string;
    @IsNotEmpty()
    score: number;
    @IsNotEmpty()
    options: [];
}
