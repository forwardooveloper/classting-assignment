import { Controller } from '@nestjs/common';
import { SchoolControllerInterface } from './school.controller.interface';

@Controller()
export class SchoolController implements SchoolControllerInterface {
  constructor() {}
}
