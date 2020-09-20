import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import DateUtil from "../util/date-util";
import {UserQuizService} from "./user-quiz.service";
import {UserQuiz, UserQuizSchema} from "./user-quiz.schema";
import {UserQuizController} from "./user-quiz.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: UserQuiz.name, schema: UserQuizSchema}])],
    controllers: [UserQuizController],
    providers: [UserQuizService, DateUtil],
    exports: [UserQuizService, DateUtil],
})
export class UserQuizModule {
}
