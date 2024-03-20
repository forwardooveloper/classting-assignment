import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SchoolControllerInterface } from './school.controller.interface';
import {
  IdDto,
  IdWithNewsIdDto,
  PostNewsDto,
  PostSchoolDto,
} from './school.controller.dto';
import { SCHOOL_SERVICE } from '../symbol/school.symbol';
import { SchoolServiceInterface } from '../service/school.service.interface';
import { PostSchoolResult, PutNewsResult } from './school.controller.result';

@Controller('school')
export class SchoolController implements SchoolControllerInterface {
  constructor(
    @Inject(SCHOOL_SERVICE) private service: SchoolServiceInterface,
  ) {}

  @Post()
  postSchool(@Body() dto: PostSchoolDto): Promise<PostSchoolResult> {
    return this.service.addSchool(dto);
  }

  @Post('/:id/news')
  postNews(
    @Param() idDto: IdDto,
    @Body() dto: PostNewsDto,
  ): Promise<PostSchoolResult> {
    return this.service.addNews({
      id: idDto.id,
      title: dto.title,
      content: dto.content,
    });
  }

  @Put('/:id/news/:newsId')
  putNews(
    @Param() idSetDto: IdWithNewsIdDto,
    @Body() dto: PostNewsDto,
  ): Promise<PutNewsResult> {
    return this.service.modifyNews({
      id: idSetDto.id,
      newsId: idSetDto.newsId,
      title: dto.title,
      content: dto.content,
    });
  }

  @Delete('/:id/news/:newsId')
  deleteNews(@Param() idSetDto: IdWithNewsIdDto): Promise<PutNewsResult> {
    return this.service.removeNews({
      id: idSetDto.id,
      newsId: idSetDto.newsId,
    });
  }
}
