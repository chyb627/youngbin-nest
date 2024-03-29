import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    const { email, name, password } = data;
    const encryptedPassword = await this.encryptPassword(password);
    return this.userRepository.save({
      email,
      name,
      password: encryptedPassword,
    });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOneBy({
      email,
    });
  }

  async login(data: LoginUserDto) {
    const { email, password } = data;

    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const match = await compare(password, user.password);

    if (!match) throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);

    const payload = {
      email,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, 'secret_key', {
      expiresIn: '1h', // 유효기간 설정 1h(1시간) 1d(1일)
    });

    return {
      accessToken,
    };
  }

  async getUser() {
    const qb = this.userRepository.createQueryBuilder();

    qb.addSelect((subQuery) => {
      return subQuery.select('count(id)').from(Board, 'Board').where('Board.userId = User.id');
    }, 'User_boardCount');

    return qb.getMany();
  }

  async encryptPassword(password: string) {
    const DEFAULT_SALT = 11;
    return hash(password, DEFAULT_SALT);
  }
}
