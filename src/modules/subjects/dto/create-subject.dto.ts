import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    example: 'Proggramming',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: '12:00',
  })
  @IsNotEmpty()
  @IsString()
  
  time: string;

  @ApiProperty({
    required: true,
    example: 'TS-5',
  })
  @IsNotEmpty()
  @IsString()
  
  classroom: string;
}