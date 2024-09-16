import { Inject, Injectable } from '@nestjs/common';
import { Article } from './article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private articleRepository: Repository<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findOne(id: number): Promise<Article> {
    return this.articleRepository.findOneBy({ id: id });
  }

  async create(article: Article): Promise<Article> {
    return this.articleRepository.save(article);
  }
}
