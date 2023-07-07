import { IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class UpdateRoomDto {
  @IsString()
  name?: string;

  @IsString()
  title?: string;

  @IsString()
  description?: string;
}
