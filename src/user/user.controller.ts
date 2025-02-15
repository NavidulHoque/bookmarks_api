import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {

    @UseGuards(AuthGuard)
    @Get('/')
    getUser(@Request() req: any){
        const {sub, email} = req.user

        return {id: sub, email}
    }
}
