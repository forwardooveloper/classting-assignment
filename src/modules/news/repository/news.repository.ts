import { Injectable } from '@nestjs/common';
import { NewsRepositoryInterface } from './news.repository.interface';

@Injectable()
export class NewsRepository implements NewsRepositoryInterface {}
