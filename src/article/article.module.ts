import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { articleProviders } from './article.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [ArticleService, ...articleProviders],
  exports: [ArticleService],
})
export class ArticleModule {}
