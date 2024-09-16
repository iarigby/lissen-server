import { Controller, Get, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('')
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: { id: number }): Promise<Article> {
    return this.articleService.findOne(params.id);
  }
}
