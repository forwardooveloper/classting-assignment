import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SchoolModule } from './modules/school/school.module';
import { DateUtilModule } from './libs/date-util/date-util.module';
import { DynamodbModule } from './libs/dynamodb/dynamodb.module';
import { StudentModule } from './modules/student/student.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    StudentModule,
    SchoolModule,
    DateUtilModule,
    DynamodbModule,
  ],
})
export class AppModule {}
