import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { use } from 'passport';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateUserDto } from './DTO-s/create-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('registration')
    async registration(@Body() createUserDto:CreateUserDto){
        return await this.userService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profil')
    async getUser(@Req() req){
        const user = await this.userService.findById(req.user.id)

        return user;
    }


    @UseGuards(JwtAuthGuard)
    @Post('update')
    async update(@Req() req, @Body()createUserDto:CreateUserDto):Promise<any>{ 
        return await this.userService.update(req.user.id,createUserDto);;
    }

    @UseGuards(JwtAuthGuard)
    @Post('changePassword')
    changePassword(@Req() req, @Body() password:any):any{
        return this.userService.changePassword(req.user.id,password.password)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    deleteUser(@Req() req):any{
        return this.userService.delete(req.user.id);
    }

    @Get('confirmation/:id')
    confirmation(@Param() id:number, @Res() res):any{
        this.userService.confirmation(id);
        return res.redirect('http://localhost:4200/login')
    }
}
