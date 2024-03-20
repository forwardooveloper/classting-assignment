import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { StudentServiceInterface } from './student.service.interface';
import { STUDENT_REPOSITORY } from '../symbol/student.symbol';
import { StudentRepositoryInterface } from '../repository/student.repository.interface';
import {
  AddSubscriptionDto,
  DeleteSubscriptionDto,
} from './student.service.dto';
import {
  AddSubscriptionResult,
  DeleteSubscriptionResult,
  FindSubscriptionListResult,
  GetSchoolResult,
} from './student.service.result';

@Injectable()
export class StudentService implements StudentServiceInterface {
  constructor(
    @Inject(STUDENT_REPOSITORY) private repository: StudentRepositoryInterface,
  ) {}

  public async addSubscription(
    dto: AddSubscriptionDto,
  ): Promise<AddSubscriptionResult> {
    const school = await this.getSchoolWithCheckExist(dto.schoolId);

    return await this.repository.createSubscription({
      id: dto.id,
      schoolId: dto.schoolId,
      schoolName: school.name,
      schoolRegion: school.region,
    });
  }

  public async findSubscriptionList(
    id: string,
  ): Promise<FindSubscriptionListResult> {
    const subscriptionList = await this.repository.getSubscriptionList(id);

    return {
      id,
      schoolList: subscriptionList.map((subscription) => ({
        schoolId: subscription.schoolId,
        schoolName: subscription.schoolName,
        schoolRegion: subscription.schoolRegion,
      })),
    };
  }

  public async deleteSubscription(
    dto: DeleteSubscriptionDto,
  ): Promise<DeleteSubscriptionResult> {
    await this.getSchoolWithCheckExist(dto.schoolId);

    return await this.repository.deleteSubscription({
      id: dto.id,
      schoolId: dto.schoolId,
    });
  }

  private async getSchoolWithCheckExist(
    schoolId: string,
  ): Promise<GetSchoolResult> {
    const school = await this.repository.getSchool(schoolId);

    if (!school) {
      throw new NotFoundException('School not found');
    }

    return school;
  }
}
