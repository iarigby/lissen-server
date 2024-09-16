import { Module } from '@nestjs/common';
import { DownloaderService } from './downloader.service';
import { DownloaderController } from './downloader.controller';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [ArticleModule],
  providers: [DownloaderService],
  controllers: [DownloaderController],
})
export class DownloaderModule {}
