import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
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
    example: '123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    required: true,
    example: 'Male/Female',
  })
  @IsNotEmpty()
  @IsString()
  sex: string;

  @ApiProperty({
    required: true,
    example: '08-06-2006',
  })
  @IsNotEmpty()
  @IsString()
  birth_date: string;

  @ApiProperty({
    required: true,
    example: 'City:Bishkek.Str:12/21.5',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}