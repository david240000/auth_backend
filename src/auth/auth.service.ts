import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from 'src/users/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtServvice: JwtService){}
    
    async validateUser(email: string, password:string):Promise<User | null>{
        const user = await this.usersService.findbyEmail(email);
        
        if (user && await user.validatePassword(password, user.password)){
            return user;
        }

        return null;
    } 

    async login(user: LoginUserDto) {
        const validUser = await this.validateUser(user.email, user.password);
        if(!validUser){
            throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);;
        }
        if(validUser.confirmationDate == null){
            throw new HttpException('Confirm email first', HttpStatus.BAD_REQUEST);;
        }
        const payload = {name: validUser.fullName, id: validUser.id};

        return {
            id: validUser.id,
            access_token: this.jwtServvice.sign(payload),
        }
    }


    async validateSSOUser(email:string, name:string){
        const user = await this.usersService.userFromSSO(email,name);
        const payload = {name: user.fullName, id: user.id};
        return {
            id: user.id,
            access_token: this.jwtServvice.sign(payload),
        }
    }

    async findUser(id:number){
        return await this.usersService.findById(id);
    }
}
