import {
  GetSchoolWithNewsListDto,
  GetSubscriptionListDto,
  IdDto,
  PostSubscriptionDto,
} from './student.controller.dto';
import {
  GetSchoolWithNewsListResult,
  GetSubscriptionListResult,
  PostSubscriptionResult,
} from './student.controller.result';

export interface StudentControllerInterface {
  postSubscription(dto: PostSubscriptionDto): Promise<PostSubscriptionResult>;
  getSubscriptionList(
    dto: GetSubscriptionListDto,
  ): Promise<GetSubscriptionListResult>;
  getSchoolWithNewsList(
    dto: GetSchoolWithNewsListDto,
  ): Promise<GetSchoolWithNewsListResult>;
  getAllSchoolWithNewsList(dto: IdDto): Promise<GetSchoolWithNewsListResult[]>;
}
