import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { PrivateToursService } from '../../services/private-tours.service';
import { InquiryService } from '../../services/inquiry.service';

@Component({
  selector: 'app-private-tours',
  standalone: true,
  imports: [RouterLink, MatIconModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-slate-900 text-white min-h-screen pb-20">
      
      <!-- Hero Header -->
      <div class="relative py-16 lg:py-24 overflow-hidden border-b border-slate-800">
        <div class="absolute inset-0 z-0">
          <img src="/images/hero-china-prime.jpg" alt="VIP Private China Tours"
               class="w-full h-full object-cover opacity-20"
               referrerpolicy="no-referrer">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 text-amber-300 text-xs font-bold border border-amber-400/30">
            <mat-icon class="!w-4 !h-4 !text-[16px]">verified</mat-icon>
            <span>VIP CUSTOMIZED & PRIVATE TOURS</span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            ทัวร์ส่วนตัวระดับพรีเมียม <span class="text-amber-300">ออกแบบเฉพาะคณะของคุณ</span>
          </h1>

          <p class="text-slate-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            สัมผัสประสบการณ์เที่ยวจีนอย่างอิสระ เลือกวันเดินทาง สายการบิน โรงแรมดาว และร้านอาหารได้ตามต้องการ พร้อมรถตู้ VIP และไกด์ส่วนตัวตลอดทริป
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        <!-- Private Tour Packages Showcase Grid -->
        <div class="space-y-8">
          <div class="text-center max-w-xl mx-auto space-y-2">
            <h2 class="text-2xl font-extrabold text-white">แพ็กเกจทัวร์ส่วนตัวยอดนิยม</h2>
            <p class="text-xs text-slate-400">เลือกเส้นทางตัวอย่างที่ปรับแต่งได้ตามความต้องการของคณะคุณ</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (pkg of content().packages; track pkg.slug) {
              <div class="bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700 shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col group">
                
                <div class="relative aspect-16/10 overflow-hidden bg-slate-950">
                  <img [src]="pkg.image" [alt]="pkg.title"
                       class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                       referrerpolicy="no-referrer">
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30"></div>
                  
                  <div class="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold shadow-md">
                    {{ pkg.price }}
                  </div>
                </div>

                <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div class="space-y-2">
                    <span class="text-amber-400 text-xs font-bold tracking-wider uppercase">{{ pkg.tagline }}</span>
                    <h3 class="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {{ pkg.title }}
                    </h3>
                    <p class="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {{ pkg.overview }}
                    </p>
                  </div>

                  <div class="space-y-2 pt-2 border-t border-slate-700/80">
                    <div class="text-[11px] font-bold text-amber-300">ไฮไลท์ประจำแพ็กเกจ:</div>
                    <ul class="space-y-1 text-xs text-slate-300">
                      @for (hl of pkg.highlights.slice(0, 3); track hl) {
                        <li class="flex items-center gap-1.5">
                          <mat-icon class="!w-3.5 !h-3.5 !text-[14px] text-amber-400">check</mat-icon>
                          <span>{{ hl }}</span>
                        </li>
                      }
                    </ul>
                  </div>

                  <div class="pt-3">
                    <button (click)="openPlannerModal(pkg.title)"
                            type="button"
                            class="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all">
                      ขอใบเสนอราคาแพ็กเกจนี้
                    </button>
                  </div>

                </div>

              </div>
            }
          </div>
        </div>

        <!-- Custom Trip Interactive Planner Card -->
        <div id="planner" class="bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 rounded-3xl p-8 lg:p-12 border border-amber-500/30 shadow-2xl space-y-8">
          <div class="max-w-2xl space-y-2">
            <span class="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">CUSTOM TRIP PLANNER</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">ออกแบบเส้นทางจีนในแบบของคุณเอง</h2>
            <p class="text-slate-300 text-xs sm:text-sm">กรอกข้อมูลเบื้องต้นเพื่อให้ทีมงานออกแบบและประเมินงบประมาณจัดทริปให้คุณฟรี!</p>
          </div>

          @if (submitted()) {
            <div class="p-8 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-center space-y-3">
              <mat-icon class="!w-12 !h-12 !text-[48px] text-emerald-400">check_circle</mat-icon>
              <h3 class="text-xl font-bold text-emerald-200">ได้รับข้อมูลเรียบร้อยแล้ว!</h3>
              <p class="text-sm text-emerald-300 max-w-md mx-auto">
                เจ้าหน้าที่ทีมทัวร์ส่วนตัวจะติดต่อกลับเสนอร่างแผนการเดินทาง และท่านสามารถตรวจสอบรายการจองในระบบสมาชิกได้ทันที
              </p>
              <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a routerLink="/account" (click)="submitted.set(false)"
                   class="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md">
                  ดูรายการจอง & แนบสลิป (/account)
                </a>
                <button (click)="submitted.set(false)" type="button"
                        class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs">
                  ออกแบบทริปเพิ่มเติม
                </button>
              </div>
            </div>
          } @else {
            <form (ngSubmit)="submitCustomTrip()" class="space-y-6">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label for="ptCities" class="block text-xs font-semibold text-slate-300 mb-1">เมือง/เส้นทางที่ต้องการไป *</label>
                  <input id="ptCities" [(ngModel)]="planCities" name="planCities" required type="text" placeholder="เช่น ปักกิ่ง - เซี่ยงไฮ้ หรือ จางเจียเจี้ย"
                         class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-hidden">
                </div>

                <div>
                  <label for="ptDays" class="block text-xs font-semibold text-slate-300 mb-1">จำนวนวันเดินทางที่ตั้งใจ</label>
                  <select id="ptDays" [(ngModel)]="planDays" name="planDays"
                          class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-hidden">
                    <option value="4-5 วัน">4 - 5 วัน</option>
                    <option value="6-7 วัน">6 - 7 วัน</option>
                    <option value="8-10 วัน">8 - 10 วัน (เจาะลึก)</option>
                    <option value="11+ วัน">11 วันขึ้นไป</option>
                  </select>
                </div>

                <div>
                  <label for="ptPassengers" class="block text-xs font-semibold text-slate-300 mb-1">จำนวนผู้เดินทาง (ท่าน) *</label>
                  <input id="ptPassengers" [(ngModel)]="planPassengers" name="planPassengers" required type="number" min="1"
                         class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-hidden">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label for="ptHotel" class="block text-xs font-semibold text-slate-300 mb-1">ระดับโรงแรมที่ต้องการ</label>
                  <select id="ptHotel" [(ngModel)]="planHotel" name="planHotel"
                          class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-hidden">
                    <option value="4 ดาวมาตรฐาน">4 ดาว มาตรฐาน</option>
                    <option value="5 ดาว พรีเมียม">5 ดาว พรีเมียม / ลักชัวรี</option>
                    <option value="โรงแรมบูทีคท้องถิ่น">โรงแรมสไตล์บูทีคพื้นเมือง</option>
                  </select>
                </div>

                <div>
                  <label for="ptName" class="block text-xs font-semibold text-slate-300 mb-1">ชื่อผู้ติดต่อ *</label>
                  <input id="ptName" [(ngModel)]="planName" name="planName" required type="text" placeholder="ระบุชื่อของคุณ"
                         class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-hidden">
                </div>

                <div>
                  <label for="ptPhone" class="block text-xs font-semibold text-slate-300 mb-1">เบอร์โทรศัพท์ติดต่อ *</label>
                  <input id="ptPhone" [(ngModel)]="planPhone" name="planPhone" required type="tel" placeholder="08X-XXX-XXXX"
                         class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-hidden">
                </div>
              </div>

              <div>
                <label for="ptNotes" class="block text-xs font-semibold text-slate-300 mb-1">ความต้องการเพิ่มเติม / งบประมาณต่อท่าน</label>
                <textarea id="ptNotes" [(ngModel)]="planNotes" name="planNotes" rows="3" placeholder="ระบุอาหารที่ไม่ทาน ความต้องการไกด์ หรือไฟล์ทบินถ้ามี"
                          class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-hidden"></textarea>
              </div>

              <button type="submit"
                      class="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-xl transition-all">
                ส่งแผนงานขอประเมินราคา (ฟรี)
              </button>

            </form>
          }

        </div>

      </div>
    </div>
  `,
})
export class PrivateToursComponent {
  readonly privateToursService = inject(PrivateToursService);
  readonly inquiryService = inject(InquiryService);

  readonly content = this.privateToursService.content;
  readonly submitted = signal(false);

  planCities = '';
  planDays = '5-6 วัน';
  planPassengers = 4;
  planHotel = '4 ดาวมาตรฐาน';
  planName = '';
  planPhone = '';
  planNotes = '';

  openPlannerModal(title: string) {
    this.planCities = title;
    const el = document.getElementById('planner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  submitCustomTrip() {
    if (!this.planName || !this.planPhone) return;
    this.inquiryService.addInquiry({
      type: 'private-tour',
      tourTitle: `ทัวร์ส่วนตัว: ${this.planCities}`,
      guestName: this.planName,
      phone: this.planPhone,
      email: '',
      passengersCount: this.planPassengers,
      message: `ระยะเวลา: ${this.planDays} | โรงแรม: ${this.planHotel} | โน้ต: ${this.planNotes}`,
    });
    this.submitted.set(true);
  }
}
