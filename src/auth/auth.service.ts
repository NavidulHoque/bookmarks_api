/* eslint-disable prettier/prettier */

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { Model } from 'mongoose';
import { User } from 'src/user/user.interface';
import * as argon from "argon2";
import { USER_MODEL } from 'src/user/constants';

@Injectable({})
export class AuthService {

  constructor(
    @Inject(USER_MODEL)
    private userModel: Model<User>
  ) { }

  async register(dto: AuthDto) {

    try {

      const newUser = new this.userModel(dto)

      await newUser.save()

      return { message: 'User created successfully' };
    }

    catch (error) {

      if (error.name === "ValidationError") {

        const message: string[] = [];

        Object.keys(error.errors).forEach((field) => {
          message.push(error.errors[field].message);
        });

        throw new BadRequestException(message);
      }

      throw error; //throws server error
    }
  }

  async login(dto: AuthDto) {

    try {
      const user = await this.userModel.findOne({ email: dto.email })

      if (!user) {
        throw new BadRequestException("User not found");
      }

      const isMatched = await argon.verify(user.password, dto.password)

      if (!isMatched) {
        throw new BadRequestException("Password invalid");
      }

      return {
        message: 'Logged in successfully',
        user: { id: user._id, email: user.email }
      };
    }

    catch (error) {
      throw error; //throws server error
    }
  }
}
