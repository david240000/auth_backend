import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/configs/app.config';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { emailConfig } from 'src/configs/email.config';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  MailerModule.forRootAsync(emailConfig)],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
