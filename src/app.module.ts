import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./auth/auth.module";
import {QuestionModule} from "./question/question.module";
import {UserQuizModule} from "./user-quiz/user-quiz.module";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://localhost/quiz?retryWrites=true&w=majority'),
        AuthModule,
        QuestionModule,
        UserQuizModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
