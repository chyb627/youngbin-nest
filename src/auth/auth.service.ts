import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
      status: 200,
      message: '회원가입이 완료되었습니다.',
      success: true,
    };

    try {
      await this.userRepository.save({ name, email, password });
    } catch (e) {
      console.log(e);
      if (e.code === '23505') {
        throw new ConflictException('이 이메일 주소는 이미 사용 중입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return result;
  }
}
