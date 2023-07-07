import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';
import { RoomService } from './room.service';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getRooms() {
    return this.roomService.getRooms()
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the room with the specified ID',
  })
  @ApiBadRequestResponse({
    description: 'Invalid room ID',
  })
  async getRoomById(@Param('id') id: string) {
    return this.roomService.getRoomById(id);
  }

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    if (!createRoomDto || !createRoomDto.name || !createRoomDto.title) {
        throw new BadRequestException('Invalid input or missing fields');
    }
    return this.roomService.createRoom(createRoomDto);
  }

  @Put(':id')
  async updateRoom(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.updateRoom(id, updateRoomDto);
  }

  @Delete(':id')
  async deleteRoom(@Param('id') id: string) {
    return this.roomService.deleteRoom(id);
  }
}
