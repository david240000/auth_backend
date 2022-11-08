import { Module } from '@nestjs/common';
import {JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConfig } from './jwt/jwt.config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { DiscordStrategy } from './SSO/discord/discord.strategy';
import { FacebookStrategy } from './SSO/facebook/facebook.strategy';
import { GoogleStrategy } from './SSO/google/google.strategy';
import { SessionSerializer } from './SSO/Serializer';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync(jwtConfig)],
  providers: [AuthService, JwtStrategy, GoogleStrategy, FacebookStrategy,DiscordStrategy, SessionSerializer,
  {
    provide: 'AUTH_SERVICE',
    useClass: AuthService,
  }],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
