import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from 'src/users/DTO-s/login-user.dto';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './SSO/google/google-auth.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto):any{
        return this.authService.login(loginUserDto);
    }

    @UseGuards(GoogleAuthGuard)
    @Get('google')
    async googleAuth(@Req() req){
      return HttpStatus.OK;
    }
  
    @UseGuards(GoogleAuthGuard)
    @Get('auth/google')
    async googleAuthRedirect(@Req() req, @Res() res){
      return res.redirect('http://localhost:4200/profil;access_token='+ req.user.access_token)
    }
  
    @Get("/discord")
    @UseGuards(AuthGuard("discord"))
    async discordLogin(): Promise<any> {
      return HttpStatus.OK;
    }
  
    @Get("/discord/redirect")
    @UseGuards(AuthGuard("discord"))
    async discordLoginRedirect(@Req() req, @Res() res): Promise<any> {
      return res.redirect('http://localhost:4200/profil;access_token='+ req.user.access_token)
    }
  
    @Get("/facebook")
    @UseGuards(AuthGuard("facebook"))
    async facebookLogin(): Promise<any> {
      return HttpStatus.OK;
    }
  
    @Get("/facebook/redirect")
    @UseGuards(AuthGuard("facebook"))
    async facebookLoginRedirect(@Req() req, @Res() res): Promise<any> {
      return res.redirect('http://localhost:4200/profil;access_token='+ req.user.access_token)
    }
}
