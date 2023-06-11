import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { SignupDto } from 'src/dto/signup.dto';
import { SigninDto } from 'src/dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 회원가입
  async signUp(signupDto: SignupDto) {
    const { name, email, password } = signupDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = {
      status: 200,
      message: '회원가입이 완료되었습니다.',
      success: true,
    };

    try {
      await this.userRepository.save({ name, email, password: hashedPassword });
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

  // 로그인
  async signIn(signInDto: SigninDto) {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({ where: { email } });

    const result = {
      status: 200,
      message: '로그인이 완료되었습니다.',
      success: true,
      token: '',
    };

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      result.token = accessToken;
      return result;
    } else {
      throw new ConflictException('아이디와 패스워드를 확인해주세요.');
    }
  }
}
