import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service'
import { LaunchService } from 'src/launch/launch.service';
import { UserEntity } from './user.entity';
import { UserModel } from './user.models';

@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService, 
        private launchService: LaunchService
    ) {}

    @Query()
    @UseGuards(AuthGuard)
    me(@Context('user') user: UserModel) {
        if(!user) {
            return null;
        }
        return this.userService.getUserByEmail(user.email);
    }

    @ResolveField()
    trips(@Parent() { trips }: UserEntity) {
        return this.launchService.getLaunchByIds(trips || []);
    }

    @Mutation()
    async login(@Args('email') email: string) {
        let user = await this.userService.getUserByEmail(email);
        if(!user) {
            user = await this.userService.createUser(email);
        }
        return this.userService.createToken(user);
    }

    @Mutation()
    @UseGuards(AuthGuard)
    async bookTrips(
        @Args('launchIds') ids: number[], 
        @Context('user') user: UserEntity) {
        return this.userService.addTrips(ids, user);
    }

    @Mutation()
    @UseGuards(AuthGuard)
    cancelTrip(
        @Args('launchId') id: number, 
        @Context('user') user: UserEntity) {
        return this.userService.removeTrip(id, user);
    }
}