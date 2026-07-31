import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { siteConfig } from '../../data/site-config';
import { InquiryService } from '../../services/inquiry.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <span class="px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold">CONTACT US</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900">ติดต่อสอบถาม / ขอใบเสนอราคา</h1>
          <p class="text-slate-600 text-sm sm:text-base font-light">
            ทีมงาน CHINA PRIME พร้อมยินดีต้อนรับและให้คำปรึกษาการเดินทางประเทศจีนทุกเส้นทาง
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div class="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">ข้อมูลการติดต่อ</h3>

            <div class="space-y-4 text-xs text-slate-600">
              <div class="flex items-start gap-3">
                <mat-icon class="text-red-800 shrink-0">location_on</mat-icon>
                <div>
                  <div class="font-bold text-slate-900 text-sm">ที่ตั้งสำนักงาน</div>
                  <div>{{ config.addressLines.join(' ') }}</div>
                  <div class="text-amber-700 font-medium mt-0.5">({{ config.officeLandmark }})</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <mat-icon class="text-red-800 shrink-0">phone</mat-icon>
                <div>
                  <div class="font-bold text-slate-900 text-sm">โทรศัพท์</div>
                  <a [href]="config.phoneHref" class="text-red-800 font-bold hover:underline">{{ config.phoneDisplay }}</a>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <mat-icon class="text-emerald-600 shrink-0">chat</mat-icon>
                <div>
                  <div class="font-bold text-slate-900 text-sm">LINE Official</div>
                  <a [href]="config.lineUrl" target="_blank" class="text-emerald-700 font-bold hover:underline">{{ config.lineId }}</a>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <mat-icon class="text-red-800 shrink-0">email</mat-icon>
                <div>
                  <div class="font-bold text-slate-900 text-sm">อีเมล</div>
                  <div>{{ config.email }}</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <mat-icon class="text-slate-400 shrink-0">schedule</mat-icon>
                <div>
                  <div class="font-bold text-slate-900 text-sm">เวลาทำการ</div>
                  <div>{{ config.weekdayHoursLong }}</div>
                  <div>{{ config.weekendHoursLong }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <h3 class="text-xl font-bold text-slate-900">ส่งข้อความถึงทีมงาน</h3>

            @if (submitted()) {
              <div class="p-6 rounded-xl bg-emerald-50 text-center space-y-2 border border-emerald-200">
                <mat-icon class="!w-10 !h-10 !text-[40px] text-emerald-600">check_circle</mat-icon>
                <div class="font-bold text-emerald-900 text-base">ขอบคุณสำหรับข้อความ!</div>
                <p class="text-xs text-emerald-700">เจ้าหน้าที่จะติดต่อกลับไปยังเบอร์โทรศัพท์/LINE ที่คุณระบุไว้ภายใน 24 ชั่วโมงครับ</p>
                <button (click)="submitted.set(false)" type="button" class="mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg">
                  ส่งข้อความเพิ่ม
                </button>
              </div>
            } @else {
              <form (ngSubmit)="submitForm()" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="cntName" class="block text-xs font-semibold text-slate-700 mb-1">ชื่อ-นามสกุลผู้ติดต่อ *</label>
                    <input id="cntName" [(ngModel)]="name" name="name" required type="text" placeholder="ระบุชื่อของคุณ"
                           class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-800 outline-hidden">
                  </div>
                  <div>
                    <label for="cntPhone" class="block text-xs font-semibold text-slate-700 mb-1">เบอร์โทรศัพท์ *</label>
                    <input id="cntPhone" [(ngModel)]="phone" name="phone" required type="tel" placeholder="08X-XXX-XXXX"
                           class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-800 outline-hidden">
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="cntLine" class="block text-xs font-semibold text-slate-700 mb-1">LINE ID</label>
                    <input id="cntLine" [(ngModel)]="lineId" name="lineId" type="text" placeholder="ระบุ LINE ID"
                           class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-800 outline-hidden">
                  </div>
                  <div>
                    <label for="cntTopic" class="block text-xs font-semibold text-slate-700 mb-1">หัวข้อที่ติดต่อ</label>
                    <select id="cntTopic" [(ngModel)]="topic" name="topic"
                            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-800 outline-hidden bg-white">
                      <option value="ทัวร์ส่วนตัว">ขอใบเสนอราคาจองทัวร์ส่วนตัว (Private)</option>
                      <option value="จอยทัวร์">สอบถามจอยทัวร์ (Join Group)</option>
                      <option value="องค์กรสัมมนา">จัดทริปองค์กร/สัมมนาบริษัท</option>
                      <option value="อื่น ๆ">สอบถามทั่วไป / ข้อเสนอแนะ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label for="cntMsg" class="block text-xs font-semibold text-slate-700 mb-1">รายละเอียดข้อความ / เมืองที่สนใจ</label>
                  <textarea id="cntMsg" [(ngModel)]="message" name="message" rows="4" placeholder="ระบุรายละเอียด เช่น เมืองที่อยากไป วันเดินทาง หรือจำนวนคน"
                            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-800 outline-hidden"></textarea>
                </div>

                <button type="submit"
                        class="px-8 py-3 rounded-xl bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-sm shadow-md transition-all">
                  ส่งข้อความติดต่อ
                </button>
              </form>
            }

          </div>

        </div>

      </div>
    </div>
  `,
})
export class ContactComponent {
  readonly config = siteConfig;
  readonly inquiryService = inject(InquiryService);
  readonly submitted = signal(false);

  name = '';
  phone = '';
  lineId = '';
  topic = 'ทัวร์ส่วนตัว';
  message = '';

  submitForm() {
    if (!this.name || !this.phone) return;
    this.inquiryService.addInquiry({
      type: 'general',
      guestName: this.name,
      phone: this.phone,
      email: '',
      lineId: this.lineId,
      passengersCount: 2,
      message: `[หัวข้อ: ${this.topic}] ${this.message}`,
    });
    this.submitted.set(true);
  }
}
