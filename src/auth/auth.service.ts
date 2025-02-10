/* eslint-disable prettier/prettier */

import { Inject, Injectable } from '@nestjs/common';
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
      const hashedPassword = await argon.hash(dto.password)

      await this.userModel.create({ email: dto.email, password: hashedPassword });
      return { message: 'User created successfully' };
    }

    catch (error) {
      return { error }
    }
  }

  login() {
    return { message: 'Login' };
  }
}
