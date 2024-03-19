import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupsDto {
  @ApiProperty({
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    example: 'john@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}