// this file holds all intermediate data structures

import { User, TripUpdateResponse } from '../graphql';

export interface UserModel extends Omit<User, 'trips'> {}

//replacing 'launches' property with array of numbers 
export interface TripUpdateResponseModel 
    extends Omit<TripUpdateResponse, 'launches'> {
    launches: number[];
}