import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const result = {
      status: 201,
      message: '',
      success: false,
    };

    try {
      // await this.userRepository.createQueryBuilder().insert().into(User).values({ email, password, name }).execute();
      result.status = 302;
      result.message = '회원가입이 완료되었습니다.';
      result.success = true;
    } catch (e) {
      console.log(e);
      result.status = 400;
      result.message = '에러입니다.';
    }

    return result;
  }
}
