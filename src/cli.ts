import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DownloaderService } from './downloader/downloader.service';
import { ArticleService } from './article/article.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const downloaderService = app.get(DownloaderService);
  const articleService = app.get(ArticleService);
  const articleLinks = await downloaderService.fetchNewArticles();
  const downloads = articleLinks.map(async (a) => {
    const exists = await articleService.findByURL(a.href);
    if (!exists) {
      return downloaderService.downloadArticle(a);
    }
  });

  const articles = await Promise.all(downloads);
  const newArticles = articles.filter((a) => a);
  newArticles.forEach((article) => {
    // @ts-expect-error want to avoid using Article entity in the parser for now
    articleService.create(article);
  });
  console.log('shutting down');
  await app.close();
}
bootstrap();
