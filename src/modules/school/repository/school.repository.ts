import { Inject, Injectable } from '@nestjs/common';
import { SchoolRepositoryInterface } from './school.repository.interface';
import { CreateSchoolDto } from './school.repository.dto';
import { AffectResult } from './schoo.repository.result';
import { v4 } from 'uuid';
import { DYNAMODB } from 'src/libs/dynamodb/symbol/dynamodb-manager.symbol';
import { Dynamodb } from 'src/libs/dynamodb/dynamodb';

@Injectable()
export class SchoolRepository implements SchoolRepositoryInterface {
  constructor(@Inject(DYNAMODB) private dynamodb: Dynamodb) {}

  async createSchool(dto: CreateSchoolDto): Promise<AffectResult> {
    const id = `SCHOOL#${v4()}`;

    await this.dynamodb.putItem({
      TableName: 'TestTable',
      Item: {
        PK: id,
        SK: 'sortkey',
        name: dto.name,
        region: dto.region,
      },
    });

    return { affectedId: id };
  }
}
