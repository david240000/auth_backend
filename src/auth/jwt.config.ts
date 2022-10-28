import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";
import appConfig from "src/app.config";

export const jwtConfig: JwtModuleAsyncOptions = {
    useFactory() {
        return {
            secret: appConfig().jwtSecret,
            signOptions: {expiresIn: '1d'},
        }
    }
}