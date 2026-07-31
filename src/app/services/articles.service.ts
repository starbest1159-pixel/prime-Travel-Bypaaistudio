import { Injectable, signal } from '@angular/core';
import { articlesData, Article } from '../data/articles.data';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  readonly allArticles = signal<Article[]>(articlesData);

  getArticleBySlug(slug: string): Article | undefined {
    return this.allArticles().find((a) => a.slug === slug);
  }
}
