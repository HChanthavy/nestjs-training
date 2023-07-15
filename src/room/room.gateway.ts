import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'
import { RoomService } from './room.service';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage('createRoom')
  async create(@MessageBody() createRoomDto: CreateRoomDto) {
    const room = await this.roomService.createRoom(createRoomDto)

    this.server.emit('room', room)

    return room
  }

  @SubscribeMessage('getRooms')
  getRooms() {
    return this.roomService.getRooms();
  }
}