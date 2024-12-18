import { IsNotEmpty, IsInt } from 'class-validator';

export class GetStudentByIdDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
