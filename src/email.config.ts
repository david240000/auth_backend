import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface"
import { DotenvConfigOptions } from "dotenv"
import appConfig from "./app.config"

export const emailConfig: MailerAsyncOptions = {
    useFactory() {
       return  {transport: {
          host: appConfig().emailHost,
          auth:{
            user: appConfig().emailUser,
            pass: appConfig().emailPassword
          }
        }
    }
}
}