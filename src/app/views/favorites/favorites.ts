import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesService } from '../../services/favorites.service';
import { JoinToursService } from '../../services/join-tours.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold">SAVED TOURS</span>
          <h1 class="text-3xl font-extrabold text-slate-900">โปรแกรมทัวร์ที่คุณบันทึกไว้</h1>
          <p class="text-xs text-slate-500">เปรียบเทียบและเลือกจองโปรแกรมทัวร์จีนที่คุณถูกใจ</p>
        </div>

        @if (favTours().length > 0) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (tour of favTours(); track tour.slug) {
              <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
                <div class="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <img [src]="tour.image" [alt]="tour.title" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                  <button (click)="favoritesService.toggleFavorite(tour.slug)"
                          class="absolute top-3 right-3 p-2 rounded-full bg-slate-900/60 text-red-500">
                    <mat-icon>favorite</mat-icon>
                  </button>
                </div>
                <div class="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 class="font-bold text-slate-900 text-base line-clamp-2">{{ tour.title }}</h3>
                    <div class="text-xs text-slate-500 mt-1">{{ tour.destination }} • {{ tour.duration }}</div>
                  </div>
                  <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div class="font-extrabold text-red-900 text-base">{{ tour.price }}</div>
                    <a [routerLink]="['/join-tours', tour.slug]" class="px-3 py-1.5 rounded-lg bg-red-900 text-amber-200 text-xs font-bold">
                      ดูรายละเอียด
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="py-16 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <mat-icon class="!w-12 !h-12 !text-[48px] text-slate-300">favorite_border</mat-icon>
            <h3 class="text-lg font-bold text-slate-800">ยังไม่มีรายการทัวร์ที่บันทึกไว้</h3>
            <p class="text-xs text-slate-500">คุณสามารถกดไอคอนหัวใจที่การ์ดทัวร์เพื่อบันทึกไว้ดูภายหลังได้ครับ</p>
            <a routerLink="/join-tours" class="inline-block px-4 py-2 bg-red-900 text-amber-200 text-xs font-bold rounded-xl mt-2">
              เลือกดูโปรแกรมทัวร์จีน
            </a>
          </div>
        }

      </div>
    </div>
  `,
})
export class FavoritesComponent {
  readonly favoritesService = inject(FavoritesService);
  readonly joinToursService = inject(JoinToursService);

  readonly favTours = computed(() => {
    const slugs = this.favoritesService.favoriteSlugs();
    return this.joinToursService.allTours().filter((t) => slugs.includes(t.slug));
  });
}
