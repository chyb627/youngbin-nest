import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: '이메일',
    required: true,
    example: 'test@test.com',
  })
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  @ApiProperty({
    description: '비밀번호',
    required: true,
    example: '12345678',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({
    description: '이름',
    required: true,
    example: 'test',
  })
  name: string;

  // @IsIn(['Female', 'Male'])
  // gender: string;

  // @IsPhoneNumber('KR')
  // phoneNumber: string;
}
