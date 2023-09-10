import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateBoardsDto {
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  contents: string;
}
