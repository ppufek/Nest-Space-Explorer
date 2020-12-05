import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { LaunchModule } from 'src/launch/launch.module';
 
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), LaunchModule, HttpModule],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}