import { Controller } from '@nestjs/common';
import { StudentControllerInterface } from './student.controller.interface';

@Controller()
export class StudentController implements StudentControllerInterface {}
