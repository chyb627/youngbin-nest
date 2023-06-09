import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from '../dto/signup.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(signupDto: SignupDto) {
    const { name, email, password } = signupDto;
    const result = {
      status: 201,
      message: '',
      success: false,
    };

    try {
      await this.userRepository.save({ name, email, password });
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
