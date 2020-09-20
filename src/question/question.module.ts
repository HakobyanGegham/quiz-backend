import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import DateUtil from "../util/date-util";
import {Question, QuestionSchema} from "./question.schema";
import {QuestionService} from "./question.service";
import {QuestionController} from "./question.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: Question.name, schema: QuestionSchema}])],
    controllers: [QuestionController],
    providers: [QuestionService, DateUtil],
    exports: [QuestionService, DateUtil],
})
export class QuestionModule {
}
