export interface DownloadedArticle {
  title: string;
  description: string;
  publishedTime: string;
  content: string;
  audioURL?: string;
}

export function parseArticle(document: Document): DownloadedArticle {
  const paragraphs = [
    ...document.getElementsByClassName('article-details-text'),
  ];
  const content = paragraphs.map((p) => p.innerHTML).join('\n\n');
  const article: DownloadedArticle = {
    title: document.querySelector('span.headline-title').innerHTML,
    description: document.querySelector('p.article-header-description')
      .innerHTML,
    publishedTime: document.querySelector('time').dateTime,
    content: content,
  };
  const audioURL: HTMLAnchorElement = document.querySelector(
    'a.btn-action-download',
  );
  if (audioURL) {
    article.audioURL = audioURL.href;
  }
  return article;
}

export function parseHomepageForArticles(document: Document) {
  const articles = document.getElementsByTagName('article');
  return [...articles]
    .map((a) => a.children[0])
    .map((a: HTMLAnchorElement) => {
      return {
        title: a.title,
        href: a.href,
      };
    });
}
