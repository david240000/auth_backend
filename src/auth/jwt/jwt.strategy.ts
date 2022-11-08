import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import appConfig from "src/configs/app.config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appConfig().jwtSecret,
        });
    }

    async validate(payload:any){
        return {
            id: payload.id,
            name: payload.fullname
        }
    }
}