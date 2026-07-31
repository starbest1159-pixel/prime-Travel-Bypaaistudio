import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { JoinToursService } from '../../services/join-tours.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <span class="px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold">CHINA DESTINATIONS</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900">สำรวจเมืองยอดนิยมในประเทศจีน</h1>
          <p class="text-slate-600 text-sm sm:text-base font-light">
            สัมผัสเสน่ห์อันหลากหลาย ตั้งแต่เมืองมหานครทันสมัย ธรรมชาติขุนเขาตระการตา จนถึงเมืองประวัติศาสตร์พันปี
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (dest of destinations(); track dest.title) {
            <div class="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div class="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img [src]="dest.image" [alt]="dest.title"
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     referrerpolicy="no-referrer">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <h3 class="text-xl font-bold group-hover:text-amber-300 transition-colors">{{ dest.title }}</h3>
                  <p class="text-xs text-slate-300 font-light">{{ dest.subtitle }}</p>
                </div>
              </div>

              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div class="flex flex-wrap gap-1.5">
                  @for (cat of dest.categories; track cat) {
                    <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                      {{ cat }}
                    </span>
                  }
                </div>

                <a routerLink="/join-tours" [queryParams]="{ destination: dest.title }"
                   class="w-full py-2.5 rounded-xl bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-xs text-center shadow-xs transition-all flex items-center justify-center gap-1.5">
                  <span>ค้นหาทัวร์เมือง {{ dest.title }}</span>
                  <mat-icon class="!w-4 !h-4 !text-[16px]">arrow_forward</mat-icon>
                </a>
              </div>
            </div>
          }
        </div>

      </div>
    </div>
  `,
})
export class DestinationsComponent {
  readonly joinToursService = inject(JoinToursService);
  readonly destinations = this.joinToursService.homeDestinations;
}
