import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile } from "passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(@Inject ('AUTH_SERVICE') private readonly authService: AuthService,){
        super({
            clientID: process.env.GOOGLE_APP_ID,
            clientSecret: process.env.GOOGLE_APP_SECRET,
            callbackURL: "http://localhost:3000/auth/google",
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken:string, refreshToken: string, profile:Profile, done: VerifyCallback):Promise<any>{
        const user = await this.authService.validateSSOUser(profile.emails[0].value,profile.displayName)
        return user || null;
    }
}