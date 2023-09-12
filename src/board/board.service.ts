import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Board } from 'src/entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  private boards = [
    {
      id: 1,
      name: 'bin cha',
      contents: 'contents 1',
    },
    {
      id: 2,
      name: 'young cha',
      contents: 'contents 2',
    },
    {
      id: 3,
      name: 'three cha',
      contents: 'contents 3',
    },
    {
      id: 4,
      name: 'four cha',
      contents: 'contents 4',
    },
    {
      id: 5,
      name: 'five cha',
      contents: 'contents 5',
    },
    {
      id: 6,
      name: 'six cha',
      contents: 'contents 6',
    },
    {
      id: 7,
      name: 'seven cha',
      contents: 'contents 7',
    },
    {
      id: 8,
      name: 'eight cha',
      contents: 'contents 8',
    },
    {
      id: 9,
      name: 'nine cha',
      contents: 'contents 9',
    },
    {
      id: 10,
      name: 'ten cha',
      contents: 'contents 10',
    },
  ];

  async findAll() {
    return this.boardRepository.find();
  }

  async find(id: number) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (!board) throw new HttpException('NotFound', HttpStatus.NOT_FOUND);

    return board;
  }

  create(data: CreateBoardDto) {
    return this.boardRepository.create(data);
  }

  update(id: number, data: UpdateBoardDto) {
    const index = this.getBoardId(id);
    if (index > -1) {
      this.boards[index] = {
        ...this.boards[index],
        ...data,
      };
      return this.boards[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.getBoardId(id);
    if (index > -1) {
      const deleteBoard = this.boards[index];
      this.boards.splice(index, 1); // 요소 하나만 삭제
      return deleteBoard;
    }
    return null;
  }

  getNextId() {
    return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
  }

  getBoardId(id: number) {
    return this.boards.findIndex((board) => board.id === id);
  }
}
