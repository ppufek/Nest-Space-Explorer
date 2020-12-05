import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as jwt from 'jsonwebtoken';
import { TripUpdateResponseModel, UserModel } from './user.models';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>
    ) {}

    createToken({ id, email }: UserEntity) {
        const user: UserModel = { id, email }
        return jwt.sign(user, 'secret');
    }

    createUser(email: string) {
        return this.userRepo.create({ email }).save();
    }

    getUserByEmail(email: string) {
        return this.userRepo.findOne({ email });
    }

    private createTripUpdateError(
        message: string, 
        launches: number[]
    ): TripUpdateResponseModel {
        return { success: false, message, launches };
    }

    async addTrips(
        ids: number[], 
        { email }: UserModel
    ): Promise<TripUpdateResponseModel> {
        try {
            const user = await this.getUserByEmail(email);
            user.trips = ids;
            await user.save();
            return {
                success: true,
                message: `Successfully added trips with ids: ${ids.join(', ')}`,
                launches: ids
            }
        } catch (err) {
            this.createTripUpdateError(`Error ${err}`, ids);
        }
    }

    async removeTrip(
        id: number, 
        { email }: UserModel
    ) {
        try {
            const user = await this.getUserByEmail(email);
            if(!user.trips.includes(Number(id))) {
                return this.createTripUpdateError(
                    'Cannot cancel trip that is not booked',
                    [id]
                );
            }
            user.trips = user.trips.filter(t => t !== Number(id));
            await user.save();
            return {
                success: true,
                message: `Successfully removed trip with id: ${id}`,
                launches: [id]
            }
        } catch (err) {
            this.createTripUpdateError(`Error ${err}`, [id]);
        }
    }
}
