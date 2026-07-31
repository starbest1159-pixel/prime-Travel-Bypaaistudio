import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { JoinToursService } from '../../services/join-tours.service';
import { FavoritesService } from '../../services/favorites.service';
import { DESTINATION_OPTIONS, TRAVEL_MONTH_OPTIONS } from '../../data/home-selectors';
import { getFoodSummary } from '../../data/food-summary';
import { JoinTour } from '../../data/join-tours.data';

@Component({
  selector: 'app-join-tours',
  standalone: true,
  imports: [RouterLink, MatIconModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <span class="px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold">JOIN GROUP TOURS</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900">โปรแกรมจอยทัวร์จีนคุณภาพ</h1>
          <p class="text-slate-600 text-sm sm:text-base font-light">
            เดินทางสะดวก ปลอดภัย การันตีไม่เข้าร้านรัฐบาล พักโรงแรมดาวมาตรฐาน ทานอาหารมื้อพิเศษ
          </p>
        </div>

        <!-- Filter Controls -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div>
              <label for="jtSearch" class="block text-xs font-bold text-slate-700 mb-1">ค้นหาชื่อโปรแกรม/รหัส</label>
              <input id="jtSearch" [(ngModel)]="searchQuery" type="text" placeholder="เช่น ปักกิ่ง หรือ CP-BJ01"
                     class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-red-800 outline-hidden">
            </div>

            <div>
              <label for="jtDest" class="block text-xs font-bold text-slate-700 mb-1">จุดหมายปลายทาง</label>
              <select id="jtDest" [(ngModel)]="selectedDest"
                      class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-red-800 outline-hidden">
                @for (opt of destOptions; track opt.value) {
                  <option [value]="opt.value">{{ opt.label }}</option>
                }
              </select>
            </div>

            <div>
              <label for="jtMonth" class="block text-xs font-bold text-slate-700 mb-1">เดือนเดินทาง</label>
              <select id="jtMonth" [(ngModel)]="selectedMonth"
                      class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-red-800 outline-hidden">
                @for (opt of monthOptions; track opt.value) {
                  <option [value]="opt.value">{{ opt.label }}</option>
                }
              </select>
            </div>

            <div>
              <label for="jtTag" class="block text-xs font-bold text-slate-700 mb-1">ประเภทโปรแกรม</label>
              <select id="jtTag" [(ngModel)]="selectedTag"
                      class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-red-800 outline-hidden">
                <option value="all">ทั้งหมด</option>
                <option value="ไม่เข้าร้านรัฐบาล">ไม่เข้าร้านรัฐบาล</option>
                <option value="บินตรง">บินตรง</option>
                <option value="โรงแรม 5 ดาว">โรงแรม 5 ดาว</option>
              </select>
            </div>

          </div>
        </div>

        <!-- Tours Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (tour of filteredTours(); track tour.slug) {
            <div class="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
              
              <div class="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img [src]="tour.image" [alt]="tour.title"
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     referrerpolicy="no-referrer">
                
                @if (tour.badge) {
                  <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-900 text-amber-300 text-[11px] font-bold shadow-md">
                    {{ tour.badge }}
                  </span>
                }

                <button (click)="favoritesService.toggleFavorite(tour.slug)"
                        type="button"
                        aria-label="บันทึกทัวร์โปรด"
                        class="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-xs transition-colors">
                  <mat-icon class="!w-4 !h-4 !text-[18px]" [class.text-red-500]="favoritesService.isFavorite(tour.slug)">
                    {{ favoritesService.isFavorite(tour.slug) ? 'favorite' : 'favorite_border' }}
                  </mat-icon>
                </button>
              </div>

              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs text-slate-500">
                    <span class="font-semibold text-slate-700">{{ tour.destination }} • {{ tour.duration }}</span>
                    <span class="font-bold text-red-800">รหัส: {{ tour.code }}</span>
                  </div>

                  <h3 class="font-bold text-slate-900 text-base line-clamp-2 group-hover:text-red-800 transition-colors">
                    {{ tour.title }}
                  </h3>

                  <p class="text-xs text-slate-600 line-clamp-2 font-light leading-relaxed">
                    {{ tour.highlight }}
                  </p>
                </div>

                <div class="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                  <div class="flex items-center gap-1.5 text-slate-700">
                    <mat-icon class="!w-4 !h-4 !text-[16px] text-amber-600 shrink-0">restaurant</mat-icon>
                    <span class="line-clamp-1 font-medium">{{ getFoodText(tour) }}</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-slate-500">
                    <mat-icon class="!w-4 !h-4 !text-[16px] text-emerald-600 shrink-0">event_available</mat-icon>
                    <span class="line-clamp-1">รอบเดินทาง: {{ tour.travelDates.join(', ') }}</span>
                  </div>
                </div>

                <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div class="text-[10px] text-slate-400">ราคาเริ่มต้น</div>
                    <div class="text-lg font-extrabold text-red-900">{{ tour.price }}</div>
                  </div>

                  <a [routerLink]="['/join-tours', tour.slug]"
                     class="px-4 py-2 rounded-xl bg-red-900 hover:bg-red-800 text-amber-200 text-xs font-bold shadow-xs transition-all flex items-center gap-1">
                    <span>ดูรายละเอียด</span>
                    <mat-icon class="!w-4 !h-4 !text-[16px]">chevron_right</mat-icon>
                  </a>
                </div>

              </div>

            </div>
          }
        </div>

      </div>
    </div>
  `,
})
export class JoinToursComponent {
  readonly route = inject(ActivatedRoute);
  readonly joinToursService = inject(JoinToursService);
  readonly favoritesService = inject(FavoritesService);

  readonly destOptions = DESTINATION_OPTIONS;
  readonly monthOptions = TRAVEL_MONTH_OPTIONS;

  searchQuery = signal('');
  selectedDest = signal('all');
  selectedMonth = signal('all');
  selectedTag = signal('all');

  constructor() {
    this.route.queryParams.subscribe((params) => {
      if (params['destination']) {
        this.selectedDest.set(params['destination']);
      }
      if (params['month']) {
        this.selectedMonth.set(params['month']);
      }
    });
  }

  readonly filteredTours = computed(() => {
    let tours = this.joinToursService.allTours();
    const q = this.searchQuery().toLowerCase();
    const dest = this.selectedDest();
    const month = this.selectedMonth();
    const tag = this.selectedTag();

    if (q) {
      tours = tours.filter((t) => t.title.toLowerCase().includes(q) || t.code.toLowerCase().includes(q));
    }
    if (dest && dest !== 'all') {
      tours = tours.filter((t) => t.destination.includes(dest));
    }
    if (month && month !== 'all') {
      tours = tours.filter((t) => t.travelDates.some((d) => d.includes(month)));
    }
    if (tag && tag !== 'all') {
      tours = tours.filter((t) => t.tags.includes(tag));
    }

    return tours;
  });

  getFoodText(tour: JoinTour) {
    return getFoodSummary(tour);
  }
}
