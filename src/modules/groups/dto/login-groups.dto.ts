import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginGroupsDto {
  @ApiProperty({ required: true, example: 'adk@gmail.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}