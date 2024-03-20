import {
  AddSubscriptionDto,
  DeleteSubscriptionDto,
} from './student.service.dto';
import {
  AddSubscriptionResult,
  DeleteSubscriptionResult,
  FindSubscriptionListResult,
} from './student.service.result';

export interface StudentServiceInterface {
  addSubscription(dto: AddSubscriptionDto): Promise<AddSubscriptionResult>;
  findSubscriptionList(id: string): Promise<FindSubscriptionListResult>;
  deleteSubscription(
    dto: DeleteSubscriptionDto,
  ): Promise<DeleteSubscriptionResult>;
}
