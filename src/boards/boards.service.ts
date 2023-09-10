import { Injectable } from '@nestjs/common';
import { CreateBoardsDto } from './dto/create-boards.dto';

@Injectable()
export class BoardsService {
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

  findAll() {
    return this.boards;
  }

  find(id: number) {
    const index = this.getBoardId(id);
    return this.boards[index];
  }

  create(data: CreateBoardsDto) {
    const newBoard = { id: this.getNextId(), ...data };
    this.boards.push(newBoard);
    return newBoard;
  }

  update(id: number, data) {
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
