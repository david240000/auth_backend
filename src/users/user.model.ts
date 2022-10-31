import {ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class UserGrapQl{
    @Field(type => Int)
    readonly id: number;
    @Field()
    email:string;
    @Field({nullable: true})
    fullName?: string;
    @Field({nullable: true})
    birthDate?: Date;
    @Field({nullable: true})
    location?: string;
}