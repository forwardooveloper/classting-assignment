import { Injectable } from '@nestjs/common';
import { NewsServiceInterface } from './news.service.interface';

@Injectable()
export class NewsService implements NewsServiceInterface {}
