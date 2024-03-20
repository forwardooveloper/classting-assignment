import { IsString } from 'class-validator';

export class PostSchoolDto {
  @IsString()
  name: string;

  @IsString()
  region: string;
}
