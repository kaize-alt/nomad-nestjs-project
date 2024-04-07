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
  })
  @IsNotEmpty()
  @IsString()
  
  description: string;

 
}