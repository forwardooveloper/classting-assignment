import { IsString } from 'class-validator';

export class PostNewsDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class PutNewsIdDto {
  @IsString()
  id: string;
}

export class PutNewsDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class DeleteNewsDto {
  @IsString()
  id: string;
}
