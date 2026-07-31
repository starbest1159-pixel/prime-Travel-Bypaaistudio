import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../data/articles.data';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (article(); as art) {
      <div class="bg-white min-h-screen py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div class="space-y-4 text-center">
            <span class="px-3 py-1 rounded-full bg-red-50 text-red-800 text-xs font-bold">
              {{ art.category }}
            </span>
            <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {{ art.title }}
            </h1>
            <div class="text-xs text-slate-400 flex items-center justify-center gap-4">
              <span>ผู้เขียน: {{ art.author }}</span>
              <span>•</span>
              <span>เผยแพร่: {{ art.publishedAt }}</span>
              <span>•</span>
              <span>{{ art.readTime }}</span>
            </div>
          </div>

          <div class="aspect-16/9 rounded-2xl overflow-hidden shadow-md">
            <img [src]="art.coverImage" [alt]="art.title" class="w-full h-full object-cover" referrerpolicy="no-referrer">
          </div>

          <!-- Bullets box -->
          <div class="p-6 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2">
            <div class="font-bold text-amber-900 text-sm flex items-center gap-2">
              <mat-icon class="text-amber-600">lightbulb</mat-icon>
              <span>สรุปประเด็นสำคัญในบทความนี้</span>
            </div>
            <ul class="list-disc list-inside text-xs text-amber-800 space-y-1 pl-2">
              @for (b of art.bullets; track b) {
                <li>{{ b }}</li>
              }
            </ul>
          </div>

          <!-- Article Sections -->
          <div class="space-y-8 text-slate-800 text-sm sm:text-base leading-relaxed">
            @for (sec of art.sections; track sec.heading) {
              <div class="space-y-3">
                <h2 class="text-xl font-bold text-slate-900 border-l-4 border-red-800 pl-3">
                  {{ sec.heading }}
                </h2>
                @for (p of sec.body; track p) {
                  <p class="text-slate-600 font-light">
                    {{ p }}
                  </p>
                }
              </div>
            }
          </div>

          <div class="pt-8 border-t border-slate-200 flex justify-between items-center">
            <a routerLink="/articles" class="text-xs font-bold text-red-800 hover:underline flex items-center gap-1">
              <mat-icon class="!w-4 !h-4 !text-[16px]">arrow_back</mat-icon>
              <span>กลับไปบทความทั้งหมด</span>
            </a>
            <a routerLink="/join-tours" class="px-4 py-2 rounded-xl bg-red-900 text-amber-200 text-xs font-bold shadow-xs">
              เลือกดูโปรแกรมทัวร์จีน
            </a>
          </div>

        </div>
      </div>
    } @else {
      <div class="py-24 text-center">
        <h2 class="text-xl font-bold text-slate-800">ไม่พบบทความนี้</h2>
        <a routerLink="/articles" class="text-xs text-red-800 underline mt-2 inline-block">กลับไปหน้ารวมบทความ</a>
      </div>
    }
  `,
})
export class ArticleDetailComponent {
  readonly route = inject(ActivatedRoute);
  readonly articlesService = inject(ArticlesService);
  readonly article = signal<Article | undefined>(undefined);

  constructor() {
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.article.set(this.articlesService.getArticleBySlug(slug));
      }
    });
  }
}
