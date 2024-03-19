import { Controller } from '@nestjs/common';
import { SubscriptionControllerInterface } from './subscription.controller.interface';

@Controller()
export class SubscriptionController
  implements SubscriptionControllerInterface {}
