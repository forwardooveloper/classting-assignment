import { PostSchoolDto } from './school.controller.dto';
import { PostSchoolResult } from './school.controller.result';

export interface SchoolControllerInterface {
  postSchool(dto: PostSchoolDto): Promise<PostSchoolResult>;
}
