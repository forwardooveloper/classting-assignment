import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { StudentControllerInterface } from './student.controller.interface';
import {
  GetSubscriptionListDto,
  PostSubscriptionDto,
} from './student.controller.dto';
import { STUDENT_SERVICE } from '../symbol/student.symbol';
import { StudentServiceInterface } from '../service/student.service.interface';
import { PostSubscriptionResult } from './student.controller.result';

@Controller('student')
export class StudentController implements StudentControllerInterface {
  constructor(
    @Inject(STUDENT_SERVICE) private service: StudentServiceInterface,
  ) {}

  @Post(':id/school/:schoolId/subscription')
  public postSubscription(
    @Param() dto: PostSubscriptionDto,
  ): Promise<PostSubscriptionResult> {
    return this.service.addSubscription({
      id: dto.id,
      schoolId: dto.schoolId,
    });
  }

  @Get(':id/school/subscription/list')
  public getSubscriptionList(@Param() dto: GetSubscriptionListDto) {
    return this.service.findSubscriptionList(dto.id);
  }
}
