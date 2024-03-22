import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { StudentControllerInterface } from './student.controller.interface';
import {
  GetSchoolWithNewsListDto,
  GetSubscriptionListDto,
  IdDto,
  PostSubscriptionDto,
} from './student.controller.dto';
import { STUDENT_SERVICE } from '../symbol/student.symbol';
import { StudentServiceInterface } from '../service/student.service.interface';
import {
  GetSchoolWithNewsListResult,
  PostSubscriptionResult,
} from './student.controller.result';

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

  @Get(':id/subscription/list')
  public getSubscriptionList(@Param() dto: GetSubscriptionListDto) {
    return this.service.findSubscriptionList(dto.id);
  }

  @Get(':id/school/all/news/list')
  public getAllSchoolWithNewsList(@Param() dto: IdDto) {
    return this.service.findAllSubscriptionSchoolWithNewsList(dto.id);
  }

  @Get(':id/school/:schoolId/news/list')
  public getSchoolWithNewsList(
    @Param() dto: GetSchoolWithNewsListDto,
  ): Promise<GetSchoolWithNewsListResult> {
    return this.service.findSchoolWithNewsList(dto.schoolId);
  }
}
