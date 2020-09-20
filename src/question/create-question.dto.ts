import {IsNotEmpty} from 'class-validator';
import CreateOptionDto from "./create-option.dto";

export default class CreateQuestionDto {
    _id?: string;
    @IsNotEmpty()
    content: string;
    @IsNotEmpty()
    score: number;
    @IsNotEmpty()
    options: CreateOptionDto[];
}
