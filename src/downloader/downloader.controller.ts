import { Controller, Post } from '@nestjs/common';
import { DownloaderService } from './downloader.service';
import { ArticleService } from '../article/article.service';

@Controller('downloader')
export class DownloaderController {
  constructor(
    private readonly downloaderService: DownloaderService,
    private readonly articleService: ArticleService,
  ) {}

  @Post('new_articles')
  async download() {
    const articleLinks = await this.downloaderService.fetchNewArticles();
    const downloads = articleLinks.map(async (a) => {
      const exists = await this.articleService.findByURL(a.href);
      if (!exists) {
        return this.downloaderService.downloadArticle(a);
      }
    });

    const articles = await Promise.all(downloads);
    const newArticles = articles.filter((a) => a);
    await Promise.all(
      newArticles.map((article) =>
        // @ts-expect-error want to avoid using Article entity in the parser for now
        this.articleService.create(article),
      ),
    );
    return { downloadedArticles: newArticles.length };
  }
}
