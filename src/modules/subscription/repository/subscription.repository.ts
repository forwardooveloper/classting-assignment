import { Injectable } from '@nestjs/common';
import { SubscriptionRepositoryInterface } from './subscription.repository.interface';

@Injectable()
export class SubscriptionRepository
  implements SubscriptionRepositoryInterface {}
