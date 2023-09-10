import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // 게시물 전부 가져오기
  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  // 게시물 하나 가져오기
  @Get(':id')
  find(@Param('id') id: string) {
    return this.boardsService.find(Number(id));
  }

  // 게시물 등록하기
  @Post()
  create(@Body() data) {
    return this.boardsService.create(data);
  }

  // 게시물 수정하기
  @Put(':id')
  update(@Param('id') id: string, @Body() data) {
    return this.boardsService.update(Number(id), data);
  }

  // 게시물 삭제하기
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(Number(id));
  }
}
