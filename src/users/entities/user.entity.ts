import {Entity, PrimaryGeneratedColumn, Column, Unique, UpdateDateColumn, BeforeInsert, BeforeUpdate} from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { MaxDate } from 'class-validator';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    email:string;
    @Column({nullable: true})
    password:string;
    @Column()
    registrationDate: Date;
    @Column()
    @UpdateDateColumn()
    modificationDate: Date;
    @Column({nullable: true})
    lastPasswordChangeDate: Date;
    @Column({nullable: true})
    confirmationDate?: Date;
    @Column()
    fullName?: string;
    @MaxDate(new Date(Date.now()))
    @Column({nullable: true})
    birthDate?: Date;
    @Column({nullable: true})
    location?: string;
    @Column({default: false})
    deleted: boolean;

    @BeforeInsert()
    async hashPassword(){
        if(this.password != null){
        this.password = await bcrypt.hash(this.password, 8);
        }
    }

    async validatePassword(password: string): Promise<boolean>{
        return await bcrypt.compare(password, this.password);
    }
}

