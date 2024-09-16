import { Injectable } from '@nestjs/common';
import * as path from 'path';
import NodeFetchCache, { FileSystemCache } from 'node-fetch-cache';
import * as os from 'os';
import * as jsdom from 'jsdom';
import { HomePageArticle, parseArticle, parseHomepageForArticles } from './parser';

const cacheLocation = path.join(os.homedir(), '.cache', 'lissen');
const homepageCacheTTL = 1000 * 60 * 60 * 24; // 1 day

const homepageUrl =
  'https://www.nachrichtenleicht.de/nachrichtenleicht-nachrichten-100.html';

@Injectable()
export class DownloaderService {
  private readonly homepageCache = useCache('homepage', homepageCacheTTL);
  private readonly articleCache = useCache('articles');

  async fetchNewArticles() {
    const homepage = await downloadHTML(this.homepageCache, homepageUrl);
    return parseHomepageForArticles(homepage);
  }

  async downloadArticle(articleLink: HomePageArticle) {
    const document = await downloadHTML(this.articleCache, articleLink.href);
    return parseArticle(document, articleLink);
  }
}

function useCache(subdir: string, ttl?: number) {
  const options = { cacheDirectory: path.join(cacheLocation, subdir) };
  if (ttl) options[ttl] = ttl;
  return NodeFetchCache.create({
    cache: new FileSystemCache(options),
  });
}

function downloadHTML(fetch, url: string) {
  return fetch(url)
    .then((r) => r.text())
    .then(parseHTML);
}

function parseHTML(text: string) {
  const dom = new jsdom.JSDOM(text);
  return dom.window.document;
}
