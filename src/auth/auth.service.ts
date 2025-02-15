import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { Model } from 'mongoose';
import { User } from 'src/user/user.interface';
import * as argon from "argon2";
import { USER_MODEL } from 'src/user/constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {

  constructor(
    @Inject(USER_MODEL)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private config: ConfigService
  ) { }

  async register(dto: AuthDto) {

    const {email, password} = dto

    try {

      const user = await this.fetchUser(email)

      if (user) {
        this.throwError("User already exists")
      }

      const newUser = new this.userModel({email, password})

      await newUser.save()

      return { message: 'User created successfully' }
    }

    catch (error) {

      if (error.name === "ValidationError") {

        const message: string[] = [];

        Object.keys(error.errors).forEach((field) => {
          message.push(error.errors[field].message);
        });

        this.throwError(message)
      }

      throw error; //throws server error
    }
  }

  async login(dto: AuthDto) {

    const {email, password: plainPassword} = dto

    try {
      const user = await this.fetchUser(email)

      if (!user) {
        this.throwError("User not found");
      }

      const { _id, password: hashedPassword } = user as any;

      const isMatched = await this.comparePassword(plainPassword, hashedPassword)

      if (!isMatched) {
        this.throwError("Password invalid")
      }

      const token = await this.generateToken(user)

      return {
        message: 'Logged in successfully',
        user: { id: _id, email },
        token
      }
    }

    catch (error) {
      throw error; //throws server error
    }
  }

  private async fetchUser(email: string): Promise<any>{

    const user = await this.userModel.findOne({email})

    return user
  }

  private async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>{
    const isMatched = await argon.verify(hashedPassword, plainPassword)

    return isMatched
  }

  private async generateToken(user: any): Promise<string> {

    const { email, _id } = user

    const payload = { sub: _id, email };
    const secret = this.config.get('JWT_SECRET')

    const token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '1d'
    })

    return token
  }

  private throwError(message: string | string[]): void{
    throw new BadRequestException(message);
  }
}
