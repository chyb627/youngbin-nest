import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 게시물 전부 가져오기
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  // 게시물 하나 가져오기
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.find(id);
  }

  // 게시물 등록하기
  @Post()
  create(@Body(new ValidationPipe()) data: CreateBoardDto) {
    return this.boardService.create(data);
  }

  // 게시물 수정하기
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) data: UpdateBoardDto) {
    return this.boardService.update(id, data);
  }

  // 게시물 삭제하기
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.remove(id);
  }
}
