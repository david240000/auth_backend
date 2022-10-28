import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-discord";
import { AuthService } from "./auth.service";

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, "discord") {
  constructor(@Inject ('AUTH_SERVICE') private readonly authService: AuthService,) {
    super({
      clientID: process.env.DC_APP_ID,
      clientSecret: process.env.DC_APP_SECRET,
      callbackURL: "http://localhost:3000/discord/redirect",
      scope: "identify",
      profileFields: ["identify"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const user = await this.authService.validateSSOUser(profile.email,profile.username);
    return user;
  }
}