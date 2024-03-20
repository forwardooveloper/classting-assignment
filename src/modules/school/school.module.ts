import { Module } from '@nestjs/common';
import { SchoolController } from './controller/school.controller';
import { SCHOOL_REPOSITORY, SCHOOL_SERVICE } from './symbol/school.symbol';
import { SchoolRepository } from './repository/school.repository';
import { SchoolService } from './service/school.service';

@Module({
  controllers: [SchoolController],
  providers: [
    {
      provide: SCHOOL_REPOSITORY,
      useClass: SchoolRepository,
    },
    {
      provide: SCHOOL_SERVICE,
      useClass: SchoolService,
    },
  ],
})
export class SchoolModule {}
