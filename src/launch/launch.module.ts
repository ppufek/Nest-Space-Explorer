import { Module, HttpModule } from '@nestjs/common';
import { LaunchResolver } from './launch.resolver';
import { LaunchService } from './launch.service';
import { MissionResolver } from './mission.resolver';
import { TripUpdateResponseResolver } from './trip-update-response.resolver';

@Module({
  imports: [HttpModule],
  providers: [
    LaunchService, 
    LaunchResolver, 
    MissionResolver, 
    TripUpdateResponseResolver
  ],
  exports: [LaunchService]
})
export class LaunchModule {}