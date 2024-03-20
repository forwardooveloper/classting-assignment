import { Injectable } from '@nestjs/common';
import { StudentRepositoryInterface } from './student.repository.interface';

@Injectable()
export class StudentRepository implements StudentRepositoryInterface {}
