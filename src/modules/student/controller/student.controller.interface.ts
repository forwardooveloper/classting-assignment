import {
  DeleteSubscriptionDto,
  GetSchoolWithNewsListDto,
  GetSubscriptionListDto,
  IdDto,
  PostSubscriptionDto,
} from './student.controller.dto';
import {
  DeleteSubscriptionResult,
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
  DeleteSubscriptionDto(
    dto: DeleteSubscriptionDto,
  ): Promise<DeleteSubscriptionResult>;
}
