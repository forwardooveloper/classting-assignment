import { Body, Controller, Inject, Param, Post, Put } from '@nestjs/common';
import { NewsControllerInterface } from './news.controller.interface';
import { NEWS_SERVICE } from '../symbol/news.symbol';
import { NewsServiceInterface } from '../service/news.service.interface';
import {
  DeleteNewsDto,
  PostNewsDto,
  PutNewsIdDto,
} from './news.controller.dto';
import {
  DeleteNewsResult,
  PostNewsResult,
  PutNewsResult,
} from './news.controller.result';

@Controller('news')
export class NewsController implements NewsControllerInterface {
  constructor(@Inject(NEWS_SERVICE) private service: NewsServiceInterface) {}

  @Post()
  async postNews(@Body() dto: PostNewsDto): Promise<PostNewsResult> {
    return await this.service.addNews(dto);
  }

  @Put('/:id')
  async putNews(
    @Param() targetDto: PutNewsIdDto,
    @Body() dto: PostNewsDto,
  ): Promise<PutNewsResult> {
    return await this.service.modifyNews({ ...targetDto, ...dto });
  }

  async deleteNews(@Body() dto: DeleteNewsDto): Promise<DeleteNewsResult> {
    return await this.service.removeNews(dto.id);
  }
}
