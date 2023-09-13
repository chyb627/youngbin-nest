import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserInfo } from 'src/decorators/user-info.decorator';

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
  @UseGuards(JwtAuthGuard)
  create(@UserInfo() userInfo, @Body('contents') contents: string) {
    if (!userInfo) throw new UnauthorizedException();

    return this.boardService.create({
      userId: userInfo.id,
      contents,
    });
  }

  // 게시물 수정하기
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @UserInfo() userInfo,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: UpdateBoardDto,
  ) {
    return this.boardService.update(userInfo.id, id, data);
  }

  // 게시물 삭제하기
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@UserInfo() userInfo, @Param('id', ParseIntPipe) id: number) {
    return this.boardService.delete(userInfo.id, id);
  }
}
