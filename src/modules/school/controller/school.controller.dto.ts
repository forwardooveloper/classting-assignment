import { IsString } from 'class-validator';

export class PostSchoolDto {
  @IsString()
  name: string;

  @IsString()
  region: string;
}

export class PostNewsDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class IdDto {
  @IsString()
  id: string;
}

export class IdWithNewsIdDto extends IdDto {
  @IsString()
  newsId: string;
}

export class PutNewsDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
