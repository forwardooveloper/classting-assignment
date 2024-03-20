import {
  GetSubscriptionListDto,
  PostSubscriptionDto,
} from './student.controller.dto';
import {
  GetSubscriptionListResult,
  PostSubscriptionResult,
} from './student.controller.result';

export interface StudentControllerInterface {
  postSubscription(dto: PostSubscriptionDto): Promise<PostSubscriptionResult>;
  getSubscriptionList(
    dto: GetSubscriptionListDto,
  ): Promise<GetSubscriptionListResult>;
}
