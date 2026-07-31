import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { siteConfig } from '../data/site-config';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Top Announcement Bar -->
    <div class="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-900/80 text-amber-200 border border-red-700/50">
            บริการระดับพรีเมียม
          </span>
          <span class="truncate">ออกแบบทริปจีนส่วนตัว & จอยทัวร์คุณภาพสูง โดยทีมงานผู้เชี่ยวชาญ</span>
        </div>
        <div class="flex items-center gap-4 text-xs">
          <a [href]="config.phoneHref" class="flex items-center gap-1 hover:text-amber-400 transition-colors">
            <mat-icon class="!w-4 !h-4 !text-[16px]">phone</mat-icon>
            <span>{{ config.phoneDisplay }}</span>
          </a>
          <span class="text-slate-700">|</span>
          <a [href]="config.lineUrl" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 hover:text-emerald-400 transition-colors">
            <span class="font-bold text-emerald-400">LINE</span>
            <span>{{ config.lineId }}</span>
          </a>
          <span class="text-slate-700 hidden md:inline">|</span>
          <span class="text-slate-400 text-[11px] hidden md:inline">{{ config.weekdayHoursShort }}</span>
        </div>
      </div>
    </div>

    <!-- Main Sticky Header -->
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Brand Logo -->
          <a routerLink="/" class="flex items-center gap-3 group focus:outline-hidden">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-red-800 via-red-900 to-amber-950 text-amber-300 flex items-center justify-center font-bold text-xl shadow-md border border-amber-500/30 group-hover:scale-105 transition-transform">
              <span class="tracking-tighter">CP</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xl font-extrabold tracking-wider bg-gradient-to-r from-red-900 via-slate-900 to-red-950 bg-clip-text text-transparent group-hover:from-red-800 group-hover:to-red-900">
                {{ config.brandName }}
              </span>
              <span class="text-[10px] tracking-widest uppercase font-semibold text-amber-700 -mt-1">
                Luxury & Custom China Travel
              </span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700">
            <a routerLink="/" routerLinkActive="text-red-800 font-semibold bg-red-50/80" [routerLinkActiveOptions]="{exact: true}"
               class="px-3 py-2 rounded-lg hover:text-red-800 hover:bg-slate-100/80 transition-all">
              หน้าแรก
            </a>
            <a routerLink="/private-tours" routerLinkActive="text-red-800 font-semibold bg-red-50/80"
               class="px-3 py-2 rounded-lg hover:text-red-800 hover:bg-slate-100/80 transition-all flex items-center gap-1">
              <span>ทัวร์ส่วนตัว</span>
              <span class="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                VIP
              </span>
            </a>
            <a routerLink="/join-tours" routerLinkActive="text-red-800 font-semibold bg-red-50/80"
               class="px-3 py-2 rounded-lg hover:text-red-800 hover:bg-slate-100/80 transition-all">
              จอยทัวร์หน้าร้อน/ฤดูกาล
            </a>
            <a routerLink="/destinations" routerLinkActive="text-red-800 font-semibold bg-red-50/80"
               class="px-3 py-2 rounded-lg hover:text-red-800 hover:bg-slate-100/80 transition-all">
              จุดหมายปลายทาง
            </a>
            <a routerLink="/sample-itineraries" routerLinkActive="text-red-800 font-semibold bg-red-50/80"
               class="px-3 py-2 rounded-lg hover:text-red-800 hover:bg-slate-100/80 transition-all">
              ตัวอย่างเส้นทาง
            </a>
            <a routerLink="/articles" routerLinkActive="text-red-800 font-semibold bg-red-50/80"
               class="px-3 py-2 rounded-lg hover:text-red-800 hover:bg-slate-100/80 transition-all">
              บทความท่องเที่ยว
            </a>
            <a routerLink="/reviews" routerLinkActive="text-red-800 font-semibold bg-red-50/80"
               class="px-3 py-2 rounded-lg hover:text-red-800 hover:bg-slate-100/80 transition-all">
              รีวิวลูกค้า
            </a>
            <a routerLink="/about" routerLinkActive="text-red-800 font-semibold bg-red-50/80"
               class="px-3 py-2 rounded-lg hover:text-red-800 hover:bg-slate-100/80 transition-all">
              เกี่ยวกับเรา
            </a>
          </nav>

          <!-- Header Right Actions -->
          <div class="flex items-center gap-2 sm:gap-3">
            
            <!-- Favorites Button -->
            <a routerLink="/favorites" class="relative p-2 rounded-xl text-slate-600 hover:text-red-700 hover:bg-red-50 transition-colors" title="รายการที่บันทึกไว้">
              <mat-icon>favorite_border</mat-icon>
              @if (favorites.count() > 0) {
                <span class="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {{ favorites.count() }}
                </span>
              }
            </a>

            <!-- Account Button -->
            <a routerLink="/account" class="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="บัญชีผู้ใช้">
              <mat-icon>person_outline</mat-icon>
            </a>

            <!-- Contact / Quote Button -->
            <a routerLink="/contact" class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-sm border border-amber-300/60 transition-all hover:shadow-md">
              <mat-icon class="!w-4 !h-4 !text-[18px]">send</mat-icon>
              <span>สอบถาม/ขอใบเสนอราคา</span>
            </a>

            <!-- Mobile Menu Toggle -->
            <button (click)="mobileMenuOpen.set(!mobileMenuOpen())"
                    type="button"
                    class="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                    aria-label="Toggle menu">
              <mat-icon>{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Menu Drawer -->
      @if (mobileMenuOpen()) {
        <div class="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          <a routerLink="/" (click)="mobileMenuOpen.set(false)"
             class="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-slate-100">
            หน้าแรก
          </a>
          <a routerLink="/private-tours" (click)="mobileMenuOpen.set(false)"
             class="flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-slate-100">
            <span>ทัวร์ส่วนตัว (VIP Customized)</span>
            <span class="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-300">
              แนะนำ
            </span>
          </a>
          <a routerLink="/join-tours" (click)="mobileMenuOpen.set(false)"
             class="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-slate-100">
            จอยทัวร์หน้าร้อน/ฤดูกาล
          </a>
          <a routerLink="/destinations" (click)="mobileMenuOpen.set(false)"
             class="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-slate-100">
            จุดหมายปลายทาง
          </a>
          <a routerLink="/sample-itineraries" (click)="mobileMenuOpen.set(false)"
             class="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-slate-100">
            ตัวอย่างเส้นทาง
          </a>
          <a routerLink="/articles" (click)="mobileMenuOpen.set(false)"
             class="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-slate-100">
            บทความท่องเที่ยว
          </a>
          <a routerLink="/reviews" (click)="mobileMenuOpen.set(false)"
             class="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-slate-100">
            รีวิวลูกค้า
          </a>
          <a routerLink="/about" (click)="mobileMenuOpen.set(false)"
             class="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-slate-100">
            เกี่ยวกับเรา
          </a>
          <a routerLink="/contact" (click)="mobileMenuOpen.set(false)"
             class="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-slate-100">
            ติดต่อเรา
          </a>

          <div class="pt-4 border-t border-slate-200 flex flex-col gap-2">
            <a routerLink="/contact" (click)="mobileMenuOpen.set(false)"
               class="w-full py-3 rounded-xl font-semibold text-center text-amber-950 bg-amber-400 hover:bg-amber-300 shadow-xs">
              สอบถาม/ขอใบเสนอราคา
            </a>
            <a [href]="config.lineUrl" target="_blank" rel="noopener noreferrer"
               class="w-full py-2.5 rounded-xl font-medium text-center text-emerald-800 bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-2">
              <span class="font-bold text-emerald-600">LINE</span>
              <span>แชตสอบถามทันที ({{ config.lineId }})</span>
            </a>
          </div>
        </div>
      }
    </header>
  `,
})
export class SiteHeaderComponent {
  readonly config = siteConfig;
  readonly favorites = inject(FavoritesService);
  readonly mobileMenuOpen = signal(false);
}
