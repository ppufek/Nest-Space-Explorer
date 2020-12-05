import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    email: string;

    // add nullable: true
    @Column('int', {array: true})
    trips: number[];
}