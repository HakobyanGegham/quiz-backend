import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user.schema";
import DateUtil from "../util/date-util";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [],
  providers: [UserService, DateUtil],
  exports: [UserService, DateUtil],
})
export class UserModule {}
