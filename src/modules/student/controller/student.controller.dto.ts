import { IsString } from 'class-validator';

export class IdDto {
  @IsString()
  id: string;
}

export class PostSubscriptionDto extends IdDto {
  @IsString()
  schoolId: string;
}

export class GetSubscriptionListDto extends IdDto {}

export class GetSchoolWithNewsListDto extends IdDto {
  @IsString()
  schoolId: string;
}
