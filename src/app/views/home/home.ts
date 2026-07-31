import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { JoinToursService } from '../../services/join-tours.service';
import { FavoritesService } from '../../services/favorites.service';
import { DESTINATION_OPTIONS, TRAVEL_MONTH_OPTIONS, PASSENGER_OPTIONS } from '../../data/home-selectors';
import { siteConfig } from '../../data/site-config';
import { getFoodSummary } from '../../data/food-summary';
import { JoinTour } from '../../data/join-tours.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatIconModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 pb-16">
      
      <!-- Hero Section -->
      <section class="relative bg-slate-950 text-white min-h-[540px] lg:min-h-[620px] flex items-center overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img src="/images/great-wall-home.jpg" alt="Great Wall China"
               class="w-full h-full object-cover opacity-35 scale-105"
               referrerpolicy="no-referrer">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full space-y-8">
          
          <div class="max-w-3xl space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/80 text-amber-300 text-xs font-bold border border-red-700/60 backdrop-blur-xs">
              <mat-icon class="!w-4 !h-4 !text-[16px]">verified</mat-icon>
              <span>{{ config.heroBadgeText }}</span>
            </div>

            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              เที่ยวจีนครบทุกเส้นทาง <br class="hidden sm:inline" />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400">
                ประสบการณ์เหนือระดับ
              </span>
            </h1>

            <p class="text-slate-300 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              ทัวร์คุณภาพ บริการใส่ใจทุกการเดินทาง ไม่เข้าร้านรัฐบาล การันตีความประทับใจโดยทีมงานมืออาชีพของ CHINA PRIME
            </p>
          </div>

          <!-- Quick Search Bar Widget -->
          <div class="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl text-slate-900 border border-white/20 max-w-5xl">
            <form (ngSubmit)="onSearch()" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              
              <div>
                <label for="homeDest" class="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <mat-icon class="!w-4 !h-4 !text-[16px] text-red-800">location_on</mat-icon>
                  <span>จุดหมายปลายทาง</span>
                </label>
                <select id="homeDest" [(ngModel)]="selectedDestination" name="selectedDestination"
                        class="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-red-800 outline-hidden">
                  @for (opt of destOptions; track opt.value) {
                    <option [value]="opt.value">{{ opt.label }}</option>
                  }
                </select>
              </div>

              <div>
                <label for="homeMonth" class="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <mat-icon class="!w-4 !h-4 !text-[16px] text-red-800">calendar_month</mat-icon>
                  <span>เดือนเดินทาง</span>
                </label>
                <select id="homeMonth" [(ngModel)]="selectedMonth" name="selectedMonth"
                        class="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-red-800 outline-hidden">
                  @for (opt of monthOptions; track opt.value) {
                    <option [value]="opt.value">{{ opt.label }}</option>
                  }
                </select>
              </div>

              <div>
                <label for="homePassengers" class="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <mat-icon class="!w-4 !h-4 !text-[16px] text-red-800">group</mat-icon>
                  <span>จำนวนผู้เดินทาง</span>
                </label>
                <select id="homePassengers" [(ngModel)]="selectedPassengers" name="selectedPassengers"
                        class="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-red-800 outline-hidden">
                  @for (opt of passengerOptions; track opt.value) {
                    <option [value]="opt.value">{{ opt.label }}</option>
                  }
                </select>
              </div>

              <div>
                <button type="submit"
                        class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-amber-200 font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 h-[42px]">
                  <mat-icon class="!w-4 !h-4 !text-[18px]">search</mat-icon>
                  <span>ค้นหาโปรแกรมทัวร์</span>
                </button>
              </div>

            </form>

            <!-- Quick Destinations Pills -->
            <div class="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200/60 mt-4 text-xs">
              <span class="text-slate-500 font-medium">เมืองยอดฮิต:</span>
              @for (city of quickCities; track city) {
                <button (click)="selectQuickCity(city)" type="button"
                        class="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-900 font-medium transition-colors">
                  {{ city }}
                </button>
              }
            </div>
          </div>

        </div>
      </section>

      <!-- Trust Badges -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div class="text-center p-3 space-y-1">
            <div class="text-2xl sm:text-3xl font-extrabold text-red-900">15+ ปี</div>
            <div class="text-xs text-slate-600 font-light">เชี่ยวชาญเส้นทางประเทศจีน</div>
          </div>
          <div class="text-center p-3 space-y-1">
            <div class="text-2xl sm:text-3xl font-extrabold text-red-900">10,000+</div>
            <div class="text-xs text-slate-600 font-light">ผู้ใช้บริการที่พึงพอใจ</div>
          </div>
          <div class="text-center p-3 space-y-1">
            <div class="text-2xl sm:text-3xl font-extrabold text-red-900">100%</div>
            <div class="text-xs text-slate-600 font-light">ไม่เข้าร้านรัฐบาลบังคับช้อป</div>
          </div>
          <div class="text-center p-3 space-y-1">
            <div class="text-2xl sm:text-3xl font-extrabold text-red-900">24 ชม.</div>
            <div class="text-xs text-slate-600 font-light">ทีมงานดูแลตลอดการเดินทาง</div>
          </div>
        </div>
      </section>

      <!-- Featured Join Tour Packages -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div class="text-xs font-bold text-red-800 uppercase tracking-wider">POPULAR TOURS</div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">โปรแกรมจอยทัวร์ยอดนิยม</h2>
          </div>
          <a routerLink="/join-tours" class="inline-flex items-center gap-1 text-xs font-bold text-red-800 hover:text-red-900 group">
            <span>ดูโปรแกรมทัวร์ทั้งหมด</span>
            <mat-icon class="!w-4 !h-4 !text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          @for (tour of joinTours(); track tour.slug) {
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

              <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
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
      </section>

      <!-- Private VIP Tour Banner -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div class="relative z-10 max-w-2xl space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <mat-icon class="!w-4 !h-4 !text-[16px]">star</mat-icon>
              <span>PRIVATE VIP CUSTOM TOURS</span>
            </div>

            <h2 class="text-2xl sm:text-4xl font-extrabold leading-tight">
              อยากไปเที่ยวจีนแบบส่วนตัว? <br />
              <span class="text-amber-300">ออกแบบแผนการเดินทางเฉพาะคณะของคุณได้ฟรี</span>
            </h2>

            <p class="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
              สำหรับครอบครัว กลุ่มเพื่อน และองค์กรธุรกิจ กำหนดวันเดินทาง รถตู้ส่วนตัว โรงแรมดาว และร้านอาหารโปรดได้เอง
            </p>

            <div class="pt-2 flex flex-wrap gap-3">
              <a routerLink="/private-tours"
                 class="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all">
                ขอเสนอราคาจัดทัวร์ส่วนตัว
              </a>
              <a [href]="config.lineUrl" target="_blank" rel="noopener noreferrer"
                 class="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-2">
                <span>คุยกับทีมงานทาง LINE</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
})
export class HomeComponent {
  readonly joinToursService = inject(JoinToursService);
  readonly favoritesService = inject(FavoritesService);
  readonly router = inject(Router);
  readonly config = siteConfig;

  readonly destOptions = DESTINATION_OPTIONS;
  readonly monthOptions = TRAVEL_MONTH_OPTIONS;
  readonly passengerOptions = PASSENGER_OPTIONS;
  readonly quickCities = ['ปักกิ่ง', 'เซี่ยงไฮ้', 'จางเจียเจี้ย', 'เฉิงตู', 'ซีอาน', 'กุ้ยหลิน'];

  selectedDestination = 'all';
  selectedMonth = 'all';
  selectedPassengers = '2';

  readonly joinTours = computed(() => this.joinToursService.allTours().slice(0, 6));

  getFoodText(tour: JoinTour) {
    return getFoodSummary(tour);
  }

  selectQuickCity(city: string) {
    this.selectedDestination = city;
    this.onSearch();
  }

  onSearch() {
    this.router.navigate(['/join-tours'], {
      queryParams: {
        destination: this.selectedDestination !== 'all' ? this.selectedDestination : null,
        month: this.selectedMonth !== 'all' ? this.selectedMonth : null,
      },
    });
  }
}
