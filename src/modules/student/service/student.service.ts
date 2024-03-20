import { Injectable } from '@nestjs/common';
import { StudentServiceInterface } from './student.service.interface';

@Injectable()
export class StudentService implements StudentServiceInterface {}
