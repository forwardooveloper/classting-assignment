import { Controller } from '@nestjs/common';
import { NewsControllerInterface } from './news.controller.interface';

@Controller()
export class NewsController implements NewsControllerInterface {}
