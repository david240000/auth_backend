import { Controller, Get, Post, UseGuards, Request, Body, Req, Param, Put, Redirect, Delete, HttpStatus, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { GoogleAuthGuard } from './auth/SSO/google/google-auth.guard';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { CreateUserDto } from './users/DTO-s/create-user.dto';
import { UsersService } from './users/users.service';
import { LoginUserDto } from './users/DTO-s/login-user.dto';

@Controller()
export class AppController {}
