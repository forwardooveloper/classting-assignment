import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SchoolControllerInterface } from './school.controller.interface';
import { PostSchoolDto } from './school.controller.dto';
import { SCHOOL_SERVICE } from '../symbol/school.symbol';
import { SchoolServiceInterface } from '../service/school.service.interface';
import { PostSchoolResult } from './school.controller.result';

@Controller('school')
export class SchoolController implements SchoolControllerInterface {
  constructor(
    @Inject(SCHOOL_SERVICE) private service: SchoolServiceInterface,
  ) {}

  @Post()
  postSchool(@Body() dto: PostSchoolDto): Promise<PostSchoolResult> {
    return this.service.addSchool(dto);
  }
}
