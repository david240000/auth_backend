import { Module } from '@nestjs/common';
import {JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './discord.strategy';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './google.strategy';
import { jwtConfig } from './jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { SessionSerializer } from './Serializer';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync(jwtConfig)],
  providers: [AuthService, JwtStrategy, GoogleStrategy, FacebookStrategy,DiscordStrategy, SessionSerializer,
  {
    provide: 'AUTH_SERVICE',
    useClass: AuthService,
  }],
  exports: [AuthService]
})
export class AuthModule {}
