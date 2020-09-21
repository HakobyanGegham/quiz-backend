import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import UserQuizAnswer from "./user-quiz-answer.dto";

@Schema()
export class UserQuiz extends Document {
    @Prop()
    _id?: string;
    @Prop()
    userId: string;

    @Prop()
    userName: string;

    @Prop()
    isComplete: boolean;

    @Prop({required: true})
    answers: UserQuizAnswer[];

    @Prop()
    score: number;

    @Prop({required: true})
    createdAt: string;

    @Prop()
    updatedAt: string;
}

export const UserQuizSchema = SchemaFactory.createForClass(UserQuiz);
