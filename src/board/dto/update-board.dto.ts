import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateBoardDto {
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  @ApiProperty({
    description: '이름',
    required: true,
    example: '홍길동',
  })
  name?: string;

  @IsOptional()
  @ApiProperty({
    description: '내용',
    required: true,
    example: '안녕하세요',
  })
  contents?: string;
}

// CreateBoardDto의 타입을 그대로 갖고와서 확장하여 사용하겠다.
// PartialType은 그것을 모두 optional한 값으로 가져오겠다는 뜻.
// export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
// export class UpdateBoardDto extends PickType(CreateBoardDto, ['name']) {}
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ['contents']) {}
