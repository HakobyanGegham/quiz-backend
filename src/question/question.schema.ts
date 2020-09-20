import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Question extends Document {
    @Prop()
    content: string;

    @Prop()
    options: [];

    @Prop()
    score: number;

    @Prop({required: true})
    createdAt: string;

    @Prop()
    updatedAt: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
