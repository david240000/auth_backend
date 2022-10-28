import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";
import appConfig from './app.config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    session({
      secret: 'SEECRET',
      saveUninitialized:false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000);
}
bootstrap();
