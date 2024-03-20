import { Module } from '@nestjs/common';
import { StudentController } from './controller/student.controller';
import { STUDENT_REPOSITORY, STUDENT_SERVICE } from './symbol/student.symbol';
import { StudentService } from './service/student.service';
import { StudentRepository } from './repository/student.repository';
import { DYNAMODB } from 'src/libs/dynamodb/symbol/dynamodb-manager.symbol';
import { Dynamodb } from 'src/libs/dynamodb/dynamodb';
import { DATE_UTIL } from 'src/libs/date-util/symbol/date-util.symbol';
import { DateUtil } from 'src/libs/date-util/date-util';

@Module({
  controllers: [StudentController],
  providers: [
    {
      provide: STUDENT_SERVICE,
      useClass: StudentService,
    },
    {
      provide: STUDENT_REPOSITORY,
      useClass: StudentRepository,
    },
    {
      provide: DYNAMODB,
      useClass: Dynamodb,
    },
    {
      provide: DATE_UTIL,
      useClass: DateUtil,
    },
  ],
})
export class StudentModule {}
