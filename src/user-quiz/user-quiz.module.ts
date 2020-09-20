import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UserQuizService} from "./user-quiz.service";
import {UserQuiz, UserQuizSchema} from "./user-quiz.schema";
import {UserQuizController} from "./user-quiz.controller";
import {QuestionModule} from "../question/question.module";
import DateUtil from "../util/date-util";

@Module({
    imports: [MongooseModule.forFeature([{name: UserQuiz.name, schema: UserQuizSchema}]),
        forwardRef(() => QuestionModule)],
    controllers: [UserQuizController],
    providers: [UserQuizService, DateUtil],
    exports: [UserQuizService, DateUtil],
})
export class UserQuizModule {
}
