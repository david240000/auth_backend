import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UserGrapQl } from './user.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
    constructor(private readonly usersService: UsersService){}

    @Query(returns => [UserGrapQl])
    @UseGuards(JwtAuthGuard)
    async users(){
        return this.usersService.allUser();
    }

    @Query(returns => UserGrapQl)
    @UseGuards(JwtAuthGuard)
    async user(@Context() context){
        return await this.usersService.findById(await context.req.user.id);
    }
}

