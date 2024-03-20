import { Module } from '@nestjs/common';
import { StudentController } from './controller/student.controller';

@Module({
  controllers: [StudentController],
})
export class StudentModule {}
