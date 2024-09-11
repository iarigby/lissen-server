import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DownloaderService } from './downloader/downloader.service';
import { ArticleService } from './article/article.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const downloaderService = app.get(DownloaderService);
  const articleService = app.get(ArticleService);
  const articles = await downloaderService.downloadNewArticles();
  console.log('found new articles');

  articles.forEach((article) => {
    console.log('creating new article');
    // @ts-expect-error want to avoid using Article entity in the parser for now
    articleService.create(article);
  });
  console.log('shutting down');
  await app.close();
}
bootstrap();
