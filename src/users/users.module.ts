import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/app.config';
import { emailConfig } from 'src/email.config';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  MailerModule.forRootAsync(emailConfig)],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
