import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class RoomService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getRooms(): Promise<any> {
    const roomKeys = await this.redis.keys('room:*');
    const roomValues = await this.redis.mget(roomKeys);
    const rooms = roomValues.map(room => JSON.parse(room));
    return rooms;
  }

  async getRoomById(id: string): Promise<any> {
    const room = await this.redis.get(`room:${id}`);
    if (!room) {
      throw new Error('Room not found');
    }
    return JSON.parse(room);
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<any> {
    const roomId = randomUUID;
    const room = { id: roomId, ...createRoomDto };
    await this.redis.set(`room:${roomId}`, JSON.stringify(room));
    return room;
  }

  async updateRoom(id: string, updateRoomDto: UpdateRoomDto): Promise<any> {
    const roomKey = `room:${id}`;
    const room = await this.redis.get(roomKey);
    if (!room) {
      throw new Error('Room not found');
    }
    const updatedRoom = { ...JSON.parse(room), ...updateRoomDto };
    await this.redis.set(roomKey, JSON.stringify(updatedRoom));
    return updatedRoom;
  }

  async deleteRoom(id: string): Promise<any> {
    const roomKey = `room:${id}`;
    const room = await this.redis.get(roomKey);
    if (!room) {
      throw new Error('Room not found');
    }
    await this.redis.del(roomKey);
    return JSON.parse(room);
  }
}
