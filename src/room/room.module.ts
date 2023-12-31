import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RoomService } from './room.service';
import { ConfigModule } from '@nestjs/config';
import { RoomGateway } from './room.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URL,
      },
    }),
  ],
  controllers: [RoomController],
  providers: [RoomService, RoomGateway],
})
export class RoomModule {}
