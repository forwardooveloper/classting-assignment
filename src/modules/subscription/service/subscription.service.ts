import { Injectable } from '@nestjs/common';
import { SubscriptionServiceInterface } from './subscription.service.interface';

@Injectable()
export class SubscriptionService implements SubscriptionServiceInterface {}
