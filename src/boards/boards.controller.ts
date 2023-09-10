import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoardsDto } from './dto/create-boards.dto';
import { UpdateBoardsDto } from './dto/update-boards.dto';

@Controller('boards')
@ApiTags('Boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // 게시물 전부 가져오기
  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  // 게시물 하나 가져오기
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.find(id);
  }

  // 게시물 등록하기
  @Post()
  create(@Body(new ValidationPipe()) data: CreateBoardsDto) {
    return this.boardsService.create(data);
  }

  // 게시물 수정하기
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) data: UpdateBoardsDto) {
    return this.boardsService.update(id, data);
  }

  // 게시물 삭제하기
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.remove(id);
  }
}
