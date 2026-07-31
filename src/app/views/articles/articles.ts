import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <span class="px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold">TRAVEL GUIDES & TIPS</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900">บทความ & คู่มือวางแผนเที่ยวจีน</h1>
          <p class="text-slate-600 text-sm sm:text-base font-light">
            รวมเทคนิค เกร็ดความรู้ การเตรียมตัว และข้อมูลท่องเที่ยวเมืองต่าง ๆ ในประเทศจีนจากทีมงานมืออาชีพ
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (art of articles(); track art.slug) {
            <a [routerLink]="['/articles', art.slug]"
               class="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div class="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img [src]="art.coverImage" [alt]="art.title"
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     referrerpolicy="no-referrer">
              </div>

              <div class="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div class="space-y-2">
                  <span class="px-2.5 py-1 rounded-md bg-red-50 text-red-800 text-xs font-bold">
                    {{ art.category }}
                  </span>
                  <h3 class="text-lg font-bold text-slate-900 group-hover:text-red-800 transition-colors line-clamp-2">
                    {{ art.title }}
                  </h3>
                  <p class="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {{ art.excerpt }}
                  </p>
                </div>

                <div class="pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{{ art.author }}</span>
                  <span>{{ art.publishedAt }}</span>
                </div>
              </div>
            </a>
          }
        </div>

      </div>
    </div>
  `,
})
export class ArticlesComponent {
  readonly articlesService = inject(ArticlesService);
  readonly articles = this.articlesService.allArticles;
}
