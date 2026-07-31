import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { siteConfig, footerPolicyItems } from '../data/site-config';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          <!-- Brand Column -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-700 to-amber-900 text-amber-300 flex items-center justify-center font-bold text-lg border border-amber-500/30">
                CP
              </div>
              <div class="flex flex-col">
                <span class="text-xl font-extrabold tracking-wider text-white">
                  {{ config.brandName }}
                </span>
                <span class="text-[10px] tracking-widest uppercase font-medium text-amber-400">
                  Luxury & Custom China Travel
                </span>
              </div>
            </div>
            <p class="text-sm text-slate-400 leading-relaxed max-w-md">
              บริการวางแผนจัดทริปท่องเที่ยวประเทศจีนแบบครบวงจร ทั้งทัวร์ส่วนตัวระดับพรีเมียม (Private Tours) และจอยทัวร์คุณภาพ ดูแลด้วยทีมงานมืออาชีพผู้เชี่ยวชาญเส้นทางจีน
            </p>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <mat-icon class="!w-4 !h-4 !text-[16px] text-amber-400">verified</mat-icon>
              <span>ใบอนุญาตประกอบธุรกิจนำเที่ยว เลขที่ {{ config.travelLicenseNumber }}</span>
            </div>
          </div>

          <!-- Quick Navigation -->
          <div class="space-y-3">
            <h3 class="text-sm font-semibold text-white tracking-wider uppercase">บริการท่องเที่ยว</h3>
            <ul class="space-y-2 text-sm text-slate-400">
              <li><a routerLink="/private-tours" class="hover:text-amber-300 transition-colors">ทัวร์ส่วนตัว (Private Tours)</a></li>
              <li><a routerLink="/join-tours" class="hover:text-amber-300 transition-colors">จอยทัวร์ (Join Group)</a></li>
              <li><a routerLink="/destinations" class="hover:text-amber-300 transition-colors">จุดหมายปลายทางยอดนิยม</a></li>
              <li><a routerLink="/sample-itineraries" class="hover:text-amber-300 transition-colors">ตัวอย่างเส้นทางเดินทาง</a></li>
              <li><a routerLink="/articles" class="hover:text-amber-300 transition-colors">คู่มือ & บทความท่องเที่ยว</a></li>
            </ul>
          </div>

          <!-- Company & Legal -->
          <div class="space-y-3">
            <h3 class="text-sm font-semibold text-white tracking-wider uppercase">เกี่ยวกับบริษัท</h3>
            <ul class="space-y-2 text-sm text-slate-400">
              @for (item of policyItems; track item.href) {
                <li><a [routerLink]="item.href" class="hover:text-amber-300 transition-colors">{{ item.label }}</a></li>
              }
              <li><a routerLink="/reviews" class="hover:text-amber-300 transition-colors">รีวิวจากผู้ใช้บริการ</a></li>
            </ul>
          </div>

          <!-- Contact Channels -->
          <div class="space-y-3">
            <h3 class="text-sm font-semibold text-white tracking-wider uppercase">ช่องทางติดต่อ</h3>
            <ul class="space-y-2.5 text-sm text-slate-400">
              <li class="flex items-start gap-2">
                <mat-icon class="!w-4 !h-4 !text-[18px] text-amber-400 shrink-0 mt-0.5">location_on</mat-icon>
                <span>{{ config.officeShort }} ({{ config.officeLandmark }})</span>
              </li>
              <li class="flex items-center gap-2">
                <mat-icon class="!w-4 !h-4 !text-[18px] text-amber-400 shrink-0">phone</mat-icon>
                <a [href]="config.phoneHref" class="hover:text-white transition-colors">{{ config.phoneDisplay }}</a>
              </li>
              <li class="flex items-center gap-2">
                <mat-icon class="!w-4 !h-4 !text-[18px] text-emerald-400 shrink-0">chat</mat-icon>
                <a [href]="config.lineUrl" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-300 transition-colors">LINE: {{ config.lineId }}</a>
              </li>
              <li class="flex items-center gap-2">
                <mat-icon class="!w-4 !h-4 !text-[18px] text-amber-400 shrink-0">email</mat-icon>
                <a [href]="'mailto:' + config.email" class="hover:text-white transition-colors">{{ config.email }}</a>
              </li>
              <li class="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <mat-icon class="!w-4 !h-4 !text-[16px] text-slate-400 shrink-0">schedule</mat-icon>
                <span>{{ config.weekdayHoursLong }}</span>
              </li>
            </ul>
          </div>

        </div>

        <!-- Bottom Copyright -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {{ config.footerCopyrightYear }} {{ config.companyNameEn }} ({{ config.companyNameTh }}). All Rights Reserved.
          </div>
          <div class="flex items-center gap-4">
            <a routerLink="/account" class="hover:text-amber-300">ระบบสมาชิก</a>
            <span>•</span>
            <a routerLink="/admin" class="hover:text-amber-300 text-slate-400">ระบบหลังบ้าน (Admin)</a>
            <span>•</span>
            <a routerLink="/privacy-policy" class="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a routerLink="/booking-payment" class="hover:text-slate-300">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {
  readonly config = siteConfig;
  readonly policyItems = footerPolicyItems;
}
