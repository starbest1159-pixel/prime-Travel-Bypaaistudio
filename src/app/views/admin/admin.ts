import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { JoinToursService } from '../../services/join-tours.service';
import { ArticlesService } from '../../services/articles.service';
import { siteConfig } from '../../data/site-config';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-slate-900 text-slate-100 min-h-screen py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div class="space-y-1">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 text-red-400 text-xs font-bold border border-red-800/80">
              <mat-icon class="!w-4 !h-4 !text-[16px]">admin_panel_settings</mat-icon>
              <span>CHINA PRIME CONTROL PANEL</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-white">ระบบบริหารหลังบ้าน & สถิติเว็บไซต์</h1>
            <p class="text-xs text-slate-400">จัดการโปรแกรมทัวร์ บทความ สถิติการเข้าชม และการตั้งค่า SEO</p>
          </div>

          <div class="flex items-center gap-3">
            <span class="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-400 text-xs font-semibold border border-emerald-800">
              ● ระบบออนไลน์ปกติ
            </span>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          <button (click)="activeTab.set('dashboard')" type="button"
                  [class]="activeTab() === 'dashboard' ? 'bg-red-900 text-amber-300 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'"
                  class="px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all">
            <mat-icon class="!w-4 !h-4 !text-[18px]">query_stats</mat-icon>
            <span>Dashboard สถิติ</span>
          </button>

          <button (click)="activeTab.set('tours')" type="button"
                  [class]="activeTab() === 'tours' ? 'bg-red-900 text-amber-300 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'"
                  class="px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all">
            <mat-icon class="!w-4 !h-4 !text-[18px]">flight_takeoff</mat-icon>
            <span>จัดการโปรแกรมทัวร์ ({{ joinToursService.allTours().length }})</span>
          </button>

          <button (click)="activeTab.set('content')" type="button"
                  [class]="activeTab() === 'content' ? 'bg-red-900 text-amber-300 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'"
                  class="px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all">
            <mat-icon class="!w-4 !h-4 !text-[18px]">article</mat-icon>
            <span>ข่าว/บทความ/รีวิว</span>
          </button>

          <button (click)="activeTab.set('seo')" type="button"
                  [class]="activeTab() === 'seo' ? 'bg-red-900 text-amber-300 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'"
                  class="px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all">
            <mat-icon class="!w-4 !h-4 !text-[18px]">search</mat-icon>
            <span>ตั้งค่า SEO & เว็บไซต์</span>
          </button>
        </div>

        <!-- TAB 1: DASHBOARD STATS -->
        @if (activeTab() === 'dashboard') {
          <div class="space-y-8">
            
            <!-- Key Metric Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
                <div class="text-xs text-slate-400 flex items-center justify-between">
                  <span>ผู้เข้าชมวันนี้</span>
                  <mat-icon class="text-amber-400 !w-4 !h-4 !text-[18px]">visibility</mat-icon>
                </div>
                <div class="text-2xl font-extrabold text-white">1,248 <span class="text-xs font-normal text-emerald-400">+12%</span></div>
                <div class="text-[11px] text-slate-400">เมื่อวาน: 1,114 คน</div>
              </div>

              <div class="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
                <div class="text-xs text-slate-400 flex items-center justify-between">
                  <span>ผู้เข้าชมเดือนนี้</span>
                  <mat-icon class="text-amber-400 !w-4 !h-4 !text-[18px]">calendar_month</mat-icon>
                </div>
                <div class="text-2xl font-extrabold text-white">38,920 <span class="text-xs font-normal text-emerald-400">+18%</span></div>
                <div class="text-[11px] text-slate-400">เดือนก่อน: 32,980 คน</div>
              </div>

              <div class="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
                <div class="text-xs text-slate-400 flex items-center justify-between">
                  <span>คลิกปุ่มจอง/แชต</span>
                  <mat-icon class="text-amber-400 !w-4 !h-4 !text-[18px]">touch_app</mat-icon>
                </div>
                <div class="text-2xl font-extrabold text-amber-300">4,152 <span class="text-xs font-normal text-emerald-400">+24%</span></div>
                <div class="text-[11px] text-slate-400">อัตรา Conversion 10.6%</div>
              </div>

              <div class="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
                <div class="text-xs text-slate-400 flex items-center justify-between">
                  <span>ยอดดาวน์โหลดโปรแกรม PDF</span>
                  <mat-icon class="text-amber-400 !w-4 !h-4 !text-[18px]">download</mat-icon>
                </div>
                <div class="text-2xl font-extrabold text-white">892</div>
                <div class="text-[11px] text-slate-400">โปรแกรมยอดฮิต: ปักกิ่ง 5D4N</div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <!-- Traffic Sources Breakdown -->
              <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
                <h3 class="text-base font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-3">
                  <mat-icon class="text-amber-400">donut_large</mat-icon>
                  <span>แหล่งที่มาของผู้เข้าชม (Traffic Sources)</span>
                </h3>

                <div class="space-y-3 text-xs">
                  <div>
                    <div class="flex justify-between text-slate-300 mb-1">
                      <span>Google Search (SEO / Organic)</span>
                      <span class="font-bold text-white">45% (17,514 คน)</span>
                    </div>
                    <div class="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div class="h-full bg-emerald-500" style="width: 45%"></div>
                    </div>
                  </div>

                  <div>
                    <div class="flex justify-between text-slate-300 mb-1">
                      <span>Facebook Ads & Page</span>
                      <span class="font-bold text-white">30% (11,676 คน)</span>
                    </div>
                    <div class="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div class="h-full bg-blue-500" style="width: 30%"></div>
                    </div>
                  </div>

                  <div>
                    <div class="flex justify-between text-slate-300 mb-1">
                      <span>LINE Official Account</span>
                      <span class="font-bold text-white">15% (5,838 คน)</span>
                    </div>
                    <div class="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div class="h-full bg-emerald-400" style="width: 15%"></div>
                    </div>
                  </div>

                  <div>
                    <div class="flex justify-between text-slate-300 mb-1">
                      <span>TikTok & YouTube Review</span>
                      <span class="font-bold text-white">10% (3,892 คน)</span>
                    </div>
                    <div class="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div class="h-full bg-pink-500" style="width: 10%"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Popular Tours Ranking -->
              <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
                <h3 class="text-base font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-3">
                  <mat-icon class="text-amber-400">trending_up</mat-icon>
                  <span>โปรแกรมทัวร์ยอดนิยมสูงสุด</span>
                </h3>

                <div class="divide-y divide-slate-700/60 text-xs">
                  <div class="py-2.5 flex items-center justify-between">
                    <div>
                      <div class="font-bold text-white">1. ปักกิ่ง กำแพงเมืองจีน 5 วัน 4 คืน (CP-BJ01)</div>
                      <div class="text-slate-400 text-[11px]">เข้าชม 14,200 ครั้ง • จองแล้ว 182 ที่นั่ง</div>
                    </div>
                    <span class="px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 font-bold">HOT</span>
                  </div>

                  <div class="py-2.5 flex items-center justify-between">
                    <div>
                      <div class="font-bold text-white">2. เซี่ยงไฮ้ ดิสนีย์แลนด์ อู๋เจิ้น 5 วัน 3 คืน (CP-SH02)</div>
                      <div class="text-slate-400 text-[11px]">เข้าชม 11,850 ครั้ง • จองแล้ว 145 ที่นั่ง</div>
                    </div>
                    <span class="px-2.5 py-1 rounded bg-emerald-400/20 text-emerald-300 font-bold">POPULAR</span>
                  </div>

                  <div class="py-2.5 flex items-center justify-between">
                    <div>
                      <div class="font-bold text-white">3. จางเจียเจี้ย หุบเขาอวตาร 6 วัน 5 คืน (CP-ZJJ03)</div>
                      <div class="text-slate-400 text-[11px]">เข้าชม 9,400 ครั้ง • จองแล้ว 118 ที่นั่ง</div>
                    </div>
                    <span class="px-2.5 py-1 rounded bg-slate-700 text-slate-300 font-bold">TOP 3</span>
                  </div>
                </div>
              </div>

            </div>

            <!-- Analytics Integration Panel -->
            <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h3 class="text-base font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-3">
                <mat-icon class="text-amber-400">analytics</mat-icon>
                <span>การเชื่อมต่อ Google Analytics & Search Console</span>
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label for="ga4Id" class="block text-slate-300 mb-1 font-semibold">Google Analytics 4 (GA4 Tracking ID)</label>
                  <input id="ga4Id" [(ngModel)]="ga4Id" name="ga4Id" type="text" placeholder="G-XXXXXXXXXX"
                         class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:ring-2 focus:ring-amber-400 outline-hidden">
                </div>
                <div>
                  <label for="gscCode" class="block text-slate-300 mb-1 font-semibold">Google Search Console Verification Tag</label>
                  <input id="gscCode" [(ngModel)]="gscVerification" name="gscVerification" type="text" placeholder="google-site-verification=..."
                         class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:ring-2 focus:ring-amber-400 outline-hidden">
                </div>
              </div>

              <div class="flex justify-end pt-2">
                <button (click)="saveAnalyticsSettings()" type="button"
                        class="px-5 py-2 rounded-xl bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-xs shadow-md">
                  บันทึกการเชื่อมต่อ Analytics
                </button>
              </div>
            </div>

          </div>
        }

        <!-- TAB 2: TOURS MANAGER -->
        @if (activeTab() === 'tours') {
          <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-6">
            <div class="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h3 class="text-lg font-bold text-white">การจัดการโปรแกรมทัวร์</h3>
                <p class="text-xs text-slate-400">แก้ไขราคา รอบเดินทาง ที่นั่ง สถานะ และรายละเอียดทัวร์</p>
              </div>
              <button (click)="addNewTourPrompt()" type="button"
                      class="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md">
                <mat-icon class="!w-4 !h-4 !text-[16px]">add</mat-icon>
                <span>เพิ่มโปรแกรมทัวร์ใหม่</span>
              </button>
            </div>

            <div class="divide-y divide-slate-700/80 text-xs">
              @for (tour of joinToursService.allTours(); track tour.slug) {
                <div class="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="flex items-center gap-4">
                    <img [src]="tour.image" [alt]="tour.title" class="w-16 h-12 object-cover rounded-xl shrink-0" referrerpolicy="no-referrer">
                    <div>
                      <div class="font-bold text-white text-sm">{{ tour.title }}</div>
                      <div class="text-slate-400">รหัส: {{ tour.code }} • {{ tour.destination }} • {{ tour.duration }}</div>
                      <div class="text-amber-300 font-semibold mt-0.5">ราคาเริ่มต้น: {{ tour.price }}</div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <button (click)="editTourPrompt(tour.title)" type="button"
                            class="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold">
                      แก้ไขข้อมูล
                    </button>
                    <button (click)="deleteTourPrompt(tour.code)" type="button"
                            class="px-3 py-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 font-semibold border border-red-800">
                      ลบโปรแกรม
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- TAB 3: CONTENT MANAGER -->
        @if (activeTab() === 'content') {
          <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-6">
            <div class="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h3 class="text-lg font-bold text-white">ข่าวสาร บทความ & รีวิวลูกค้า</h3>
                <p class="text-xs text-slate-400">จัดการข้อมูลข่าวฟรีวีซ่าจีน บทความท่องเที่ยว และภาพรีวิว</p>
              </div>
              <button (click)="addArticlePrompt()" type="button"
                      class="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md">
                <mat-icon class="!w-4 !h-4 !text-[16px]">add</mat-icon>
                <span>เขียนบทความใหม่</span>
              </button>
            </div>

            <div class="space-y-3 text-xs">
              @for (art of articlesService.allArticles(); track art.slug) {
                <div class="p-4 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between gap-3">
                  <div>
                    <span class="px-2 py-0.5 rounded bg-red-950 text-amber-300 text-[10px] font-bold">{{ art.category }}</span>
                    <div class="font-bold text-white text-sm mt-1">{{ art.title }}</div>
                    <div class="text-slate-400 text-[11px] mt-0.5">วันที่เผยแพร่: {{ art.publishedAt }}</div>
                  </div>
                  <div class="flex items-center gap-2">
                    <button type="button" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200">แก้ไข</button>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- TAB 4: SITE SETTINGS & SEO -->
        @if (activeTab() === 'seo') {
          <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-6">
            <h3 class="text-lg font-bold text-white border-b border-slate-700 pb-3">ตั้งค่าข้อมูลติดต่อ & SEO ประจำเว็บไซต์</h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label for="admBrand" class="block text-slate-300 mb-1 font-semibold">ชื่อแบรนด์ / บริษัท</label>
                <input id="admBrand" [(ngModel)]="siteBrand" name="siteBrand" type="text"
                       class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100">
              </div>

              <div>
                <label for="admPhone" class="block text-slate-300 mb-1 font-semibold">เบอร์โทรศัพท์แสดงหน้าเว็บ</label>
                <input id="admPhone" [(ngModel)]="sitePhone" name="sitePhone" type="text"
                       class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100">
              </div>

              <div>
                <label for="admLine" class="block text-slate-300 mb-1 font-semibold">LINE ID Official</label>
                <input id="admLine" [(ngModel)]="siteLine" name="siteLine" type="text"
                       class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100">
              </div>

              <div>
                <label for="admLicense" class="block text-slate-300 mb-1 font-semibold">เลขที่ใบอนุญาตท่องเที่ยว</label>
                <input id="admLicense" [(ngModel)]="siteLicense" name="siteLicense" type="text"
                       class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100">
              </div>
            </div>

            <div class="space-y-3 pt-4 border-t border-slate-700 text-xs">
              <h4 class="font-bold text-amber-300">SEO Default Meta Settings</h4>
              <div>
                <label for="admSeoTitle" class="block text-slate-300 mb-1 font-semibold">SEO Title Default</label>
                <input id="admSeoTitle" [(ngModel)]="seoTitle" name="seoTitle" type="text"
                       class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100">
              </div>
              <div>
                <label for="admSeoDesc" class="block text-slate-300 mb-1 font-semibold">SEO Meta Description</label>
                <textarea id="admSeoDesc" [(ngModel)]="seoDesc" name="seoDesc" rows="2"
                          class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100"></textarea>
              </div>
            </div>

            @if (statusMsg()) {
              <div class="p-3 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs">
                {{ statusMsg() }}
              </div>
            }

            <button (click)="saveSiteConfig()" type="button"
                    class="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md">
              บันทึกการตั้งค่าหน้าเว็บ
            </button>
          </div>
        }

      </div>
    </div>
  `,
})
export class AdminComponent {
  readonly joinToursService = inject(JoinToursService);
  readonly articlesService = inject(ArticlesService);

  readonly activeTab = signal<'dashboard' | 'tours' | 'content' | 'seo'>('dashboard');
  readonly statusMsg = signal('');

  ga4Id = 'G-CHINAPRIME2026';
  gscVerification = 'google-site-verification=china-prime-tour-verify-2026';

  siteBrand = siteConfig.companyNameTh;
  sitePhone = siteConfig.phoneDisplay;
  siteLine = siteConfig.lineId;
  siteLicense = siteConfig.travelLicenseNumber;

  seoTitle = 'CHINA PRIME | ทัวร์จีนพรีเมียม ไม่เข้าร้านรัฐบาล';
  seoDesc = 'บริการจัดทัวร์จีนคุณภาพสูง ทัวร์ส่วนตัว และจอยทัวร์จีน ไม่ลงร้านรัฐบาล การันตีความประทับใจ';

  saveAnalyticsSettings() {
    this.statusMsg.set('บันทึกการเชื่อมต่อ Google Analytics & Search Console สำเร็จ!');
    setTimeout(() => this.statusMsg.set(''), 3000);
  }

  saveSiteConfig() {
    this.statusMsg.set('บันทึกข้อมูลหน้าเว็บและ SEO เรียบร้อยแล้ว!');
    setTimeout(() => this.statusMsg.set(''), 3000);
  }

  addNewTourPrompt() {
    alert('ระบบจำลอง: พร้อมเพิ่มโปรแกรมทัวร์ใหม่ลงในฐานข้อมูลเรียบร้อยแล้ว');
  }

  editTourPrompt(title: string) {
    alert(`ระบบจำลอง: เปิดหน้าแก้ไขสำหรับ ${title}`);
  }

  deleteTourPrompt(code: string) {
    alert(`ระบบจำลอง: ลบโปรแกรมทัวร์ ${code}`);
  }

  addArticlePrompt() {
    alert('ระบบจำลอง: เปิดเอดิเตอร์สำหรับเขียนบทความใหม่');
  }
}
