import { Controller, Get, Post, UseGuards, Request, Body, Req, Param, Put, Redirect, Delete, HttpStatus, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { GoogleAuthGuard } from './auth/google-auth.guard';
import { GoogleStrategy } from './auth/google.strategy';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CreateUserDto } from './users/create-user.dto';
import { LoginUserDto } from './users/login-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

  
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto):any{
    return this.authService.login(loginUserDto);
  }

  @Post('registration')
  async registration(@Body() createUserDto:CreateUserDto){
    return await this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profil')
  async getUser(@Request() req){
    const user = await this.userService.findById(req.user.id)

    return user;
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

  @UseGuards(JwtAuthGuard)
  @Post('update')
  update(@Req() req, @Body()createUserDto:CreateUserDto):any{
    return this.userService.update(req.user.id,createUserDto);
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
