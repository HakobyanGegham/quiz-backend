import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class UserQuiz extends Document {
    @Prop()
    userId: string;

    @Prop()
    isComplete: string;

    @Prop({required: true})
    questions: [];

    @Prop()
    score: number;

    @Prop({required: true})
    createdAt: string;

    @Prop()
    updatedAt: string;
}

export const UserQuizSchema = SchemaFactory.createForClass(UserQuiz);
