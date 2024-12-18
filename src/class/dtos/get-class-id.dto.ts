import { IsNotEmpty, IsInt } from 'class-validator';

export class GetClassByIdDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
