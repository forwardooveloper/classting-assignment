import {
  CreateSubscriptionDto,
  DeleteSubscriptionDto,
} from './student.repository.dto';
import {
  AffectResult,
  GetSchoolWithNewsResult,
  GetSchoolResult,
  GetSubscriptionListResult,
} from './student.repository.result';

export interface StudentRepositoryInterface {
  createSubscription(dto: CreateSubscriptionDto): Promise<AffectResult>;
  getSchool(schoolId: string): Promise<GetSchoolResult>;
  getSubscriptionList(id: string): Promise<GetSubscriptionListResult[]>;
  deleteSubscription(dto: DeleteSubscriptionDto): Promise<AffectResult>;
  getNewsListBySchoolId(schoolId: string): Promise<GetSchoolWithNewsResult>;
}
