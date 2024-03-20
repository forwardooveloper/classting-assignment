import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { SchoolModule } from './modules/school/school.module';
import { DateUtilModule } from './libs/date-util/date-util.module';
import { DynamodbModule } from './libs/dynamodb/dynamodb.module';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    StudentModule,
    SchoolModule,
    DateUtilModule,
    DynamodbModule,
  ],
})
export class AppModule {}
