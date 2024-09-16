export interface DownloadedArticle {
  title: string;
  sourceImageURL: string;
  sourceURL: string;
  sourceAudioURL?: string;
  description: string;
  publishedTime: string;
  content: string;
}

export function parseArticle(
  document: Document,
  detailsFromHomepage: { imageURL: string; href: string },
): DownloadedArticle {
  const paragraphs = [
    ...document.getElementsByClassName('article-details-text'),
  ];
  const content = paragraphs.map((p) => p.innerHTML).join('\n\n');
  const article: DownloadedArticle = {
    title: document
      .querySelector('.b-article-header-main')
      .querySelector('.headline-title').innerHTML,
    sourceImageURL: detailsFromHomepage.imageURL,
    sourceURL: detailsFromHomepage.href,
    description: document.querySelector('p.article-header-description')
      .innerHTML,
    publishedTime: document.querySelector('time').dateTime,
    content: content,
  };
  const audioURL: HTMLAnchorElement = document.querySelector(
    'a.btn-action-download',
  );
  if (audioURL) {
    article.sourceAudioURL = audioURL.href;
  }
  return article;
}

export interface HomePageArticle {
  title: string;
  href: string;
  imageURL: string;
}

export function parseHomepageForArticles(document: Document): HomePageArticle[] {
  const articles = document.getElementsByTagName('article');
  return [...articles]
    .map((a) => a.children[0])
    .map((a: HTMLAnchorElement) => {
      const image: HTMLImageElement = a.querySelector('img.internal-image');
      return {
        title: a.title,
        href: a.href,
        imageURL: image.src,
      };
    });
}
