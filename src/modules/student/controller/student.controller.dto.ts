import { IsString } from 'class-validator';

export class PostSubscriptionDto {
  @IsString()
  id: string;

  @IsString()
  schoolId: string;
}

export class GetSubscriptionListDto {
  @IsString()
  id: string;
}
