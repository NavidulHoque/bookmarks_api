import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard'; 
import { User } from './decorator';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

    @Get('/')
    getUser(@User() user: any){
        const {sub, email} = user

        return {id: sub, email}
    }
}
