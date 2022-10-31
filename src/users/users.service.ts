import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private mailerService: MailerService
    ){}

    async create(createUserDto: CreateUserDto){
        let exist:any=null
        try{
        exist = await this.findbyEmail(createUserDto.email)
        }
        catch(e){}
        if(exist){
            throw new HttpException('Already registed', HttpStatus.BAD_REQUEST);
        }
        const user:User = new User();
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.registrationDate = new Date(Date.now());
        user.fullName = createUserDto.fullName;
        user.birthDate = createUserDto.birthDate;
        user.lastPasswordChangeDate = new Date(Date.now());
        user.location = createUserDto.location;
        user.modificationDate = new Date(Date.now());

        await this.userRepository.save(user);

        const validUser = await this.findbyEmail(user.email)
        

        const url=`http://localhost:3000/confirmation/${user.id}`
        
        const email = await this.mailerService.sendMail({
            to: user.email,
            from: 'auth@gmail.com',
            subject: 'Email megerősítése',
            text: `Email cím megerősítése: <a href="${url}">${url}</a>`
        })

        return validUser;
    }

    async findbyEmail(email: string):Promise<any> {
        const user = await this.userRepository.findOneBy({email:email, deleted: false});
        if(!user){
            throw new HttpException('Wrong email', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async findById(id:number):Promise<User> {
        const user :User= await this.userRepository.findOneById(id);
        if(!user){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async update(id:number, createUserDto:CreateUserDto):Promise<any> {
        const user:User = await this.findById(id);
        user.email = createUserDto.email;
        user.fullName = createUserDto.fullName;
        user.birthDate = createUserDto.birthDate;
        user.location = createUserDto.location;
        user.modificationDate = new Date(Date.now());
        return await this.userRepository.update(id,user);
    }

    async softDelete(id:number):Promise<any>{
        const  user:User = await this.findById(id);
        user.deleted = true;
        return await this.userRepository.update(id,user);
    }

    async delete(id:number):Promise<any>{
        return await this.userRepository.delete(id);
    }

    async confirmation(id:number):Promise<any>{
        const  user:User = await this.findById(id);
        user.confirmationDate =  new Date(Date.now());
        return await this.userRepository.update(id,user);
    }

    async changePassword(id:number, password:string){
        const  user:User = await this.findById(id);
        user.password = password;
        await user.hashPassword();
        user.lastPasswordChangeDate = new Date(Date.now());
        user.modificationDate = new Date(Date.now());
        return await this.userRepository.update(id,user);
    }

    async userFromSSO(email:string, name:string){
        const user = await this.userRepository.findOneBy({email:email, deleted: false});
        if (user){
            return user;
        }
        const newUser:User = new User();
        newUser.email = email;
        newUser.confirmationDate = new Date(Date.now());
        newUser.registrationDate = new Date(Date.now());
        newUser.fullName = name;
        newUser.modificationDate = new Date(Date.now());
        await this.userRepository.create(newUser);
        return await this.userRepository.save(newUser);
    }

    async allUser(){
        return await this.userRepository.find();
    }
}
