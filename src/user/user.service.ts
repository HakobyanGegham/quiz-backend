import {BadRequestException, Injectable} from '@nestjs/common';
import {User} from "./user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import CreateUserDto from "./create-user.dto";
import {compare, hash} from "bcrypt";
import DateUtil from "../util/date-util";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
                private dateUtil: DateUtil) {
    }

    /**
     * Returns user by email and password
     *
     * @param email
     * @param password
     */
    async findOne(email: string, password: string) {
        const user = await this.userModel.findOne({email});
        if (!user) {
            throw new BadRequestException('Email is incorrect.');
        }

        const isMatching = await compare(password, user.password);

        if (!isMatching) {
            throw new BadRequestException('Password is incorrect.')
        }

        return user;
    }

    /**
     * Creates user
     *
     * @param createUserDto
     */
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const userObj = Object.assign(createUserDto);
            const date = new Date();
            userObj.role = 'user';
            userObj.password = await hash(createUserDto.password, 10);
            userObj.createdAt = this.dateUtil.getTimestampFormattedDate(date);
            userObj.updatedAt = this.dateUtil.getTimestampFormattedDate(date);
            const createdUser = new this.userModel(userObj);
            return await createdUser.save();
        } catch (e) {
            throw e;
        }
    }
}
