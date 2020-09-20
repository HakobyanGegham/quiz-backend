import {IsNotEmpty} from 'class-validator';

export default class CreateOptionDto {
    _id?: string;
    @IsNotEmpty()
    content: string;
    @IsNotEmpty()
    isCorrect: boolean;
}
