import { Module } from '@nestjs/common';
import { SchoolController } from './controller/school.controller';

@Module({
  controllers: [SchoolController],
})
export class SchoolModule {}
