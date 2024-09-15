import { Module } from '@nestjs/common';
import { DownloaderService } from './downloader.service';

@Module({
  providers: [DownloaderService],
  controllers: [],
})
export class DownloaderModule {}
