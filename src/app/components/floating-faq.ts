import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { siteConfig } from '../data/site-config';
import { InquiryService } from '../services/inquiry.service';

@Component({
  selector: 'app-floating-faq',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Floating Action Trigger Group -->
    <div class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      
      <!-- Quick Contact Buttons -->
      <a [href]="config.lineUrl" target="_blank" rel="noopener noreferrer"
         aria-label="ติดต่อทาง LINE"
         class="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center font-bold text-xs">
        LINE
      </a>

      <button (click)="isOpen.set(!isOpen())"
              type="button"
              aria-label="คำถามที่พบบ่อยและสอบถามด่วน"
              class="w-14 h-14 rounded-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-amber-300 shadow-xl hover:scale-105 transition-all flex items-center justify-center relative">
        <mat-icon class="!w-6 !h-6 !text-[24px]">question_answer</mat-icon>
        <span class="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center border border-slate-900">
          ?
        </span>
      </button>

    </div>

    <!-- FAQ Slide-over Drawer / Modal -->
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs">
        <div class="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
          
          <div class="p-6 bg-red-900 text-white flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-amber-300">คำถามที่พบบ่อย & สอบถามด่วน</h3>
              <p class="text-xs text-slate-300">ไขข้อสงสัยการเดินทางประเทศจีน</p>
            </div>
            <button (click)="isOpen.set(false)" type="button" class="text-slate-300 hover:text-white">
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <div class="p-6 space-y-6 flex-1 overflow-y-auto">
            
            <!-- Quick FAQs -->
            <div class="space-y-3">
              <h4 class="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <mat-icon class="text-red-800 !w-4 !h-4 !text-[18px]">help</mat-icon>
                <span>คำถามที่พบบ่อย (FAQs)</span>
              </h4>

              <div class="space-y-2 text-xs">
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="font-bold text-slate-900">Q: คนไทยไปเที่ยวจีนต้องใช้วีซ่าไหม?</div>
                  <div class="text-slate-600 mt-1">A: ปัจจุบันไทย-จีน มีมาตรการยกเว้นวีซ่า (Free Visa) สำหรับหนังสือเดินทางธรรมดา สามารถท่องเที่ยวได้ไม่เกิน 30 วันครับ</div>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="font-bold text-slate-900">Q: ทัวร์ของ CHINA PRIME ลงร้านรัฐบาลไหม?</div>
                  <div class="text-slate-600 mt-1">A: โปรแกรมทัวร์จีนของเราการันตี "ไม่เข้าร้านรัฐบาลบังคับช้อป" เน้นเที่ยวเต็มเวลา ไม่เสียเวลาช้อปปิ้งครับ</div>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="font-bold text-slate-900">Q: สแกนจ่ายเงิน Alipay / WeChat Pay ที่จีนอย่างไร?</div>
                  <div class="text-slate-600 mt-1">A: สามารถผูกบัตรเครดิต/เดบิตไทยกับแอป Alipay หรือ TrueMoney ได้เลย สะดวกสบายมากครับ</div>
                </div>
              </div>
            </div>

            <!-- Quick Inquiry Form -->
            <div class="space-y-3 pt-4 border-t border-slate-100">
              <h4 class="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <mat-icon class="text-red-800 !w-4 !h-4 !text-[18px]">send</mat-icon>
                <span>ฝากข้อความให้ทีมงานติดต่อกลับ</span>
              </h4>

              @if (submitted()) {
                <div class="p-4 rounded-xl bg-emerald-50 text-emerald-900 text-xs text-center space-y-1">
                  <div class="font-bold">บันทึกข้อความเรียบร้อย!</div>
                  <p class="text-slate-600">เจ้าหน้าที่จะติดต่อกลับทางเบอร์/LINE ที่ระบุครับ</p>
                </div>
              } @else {
                <form (ngSubmit)="submitQuickForm()" class="space-y-3">
                  <div>
                    <label for="faqName" class="block text-[11px] font-semibold text-slate-700 mb-0.5">ชื่อของคุณ *</label>
                    <input id="faqName" [(ngModel)]="guestName" name="guestName" required type="text" placeholder="ชื่อผู้ติดต่อ"
                           class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-red-800 outline-hidden">
                  </div>

                  <div>
                    <label for="faqPhone" class="block text-[11px] font-semibold text-slate-700 mb-0.5">เบอร์โทรศัพท์ *</label>
                    <input id="faqPhone" [(ngModel)]="guestPhone" name="guestPhone" required type="tel" placeholder="08X-XXX-XXXX"
                           class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-red-800 outline-hidden">
                  </div>

                  <div>
                    <label for="faqLine" class="block text-[11px] font-semibold text-slate-700 mb-0.5">LINE ID (ถ้ามี)</label>
                    <input id="faqLine" [(ngModel)]="guestLine" name="guestLine" type="text" placeholder="LINE ID"
                           class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-red-800 outline-hidden">
                  </div>

                  <div>
                    <label for="faqMsg" class="block text-[11px] font-semibold text-slate-700 mb-0.5">ข้อความ / เมืองที่สนใจ</label>
                    <textarea id="faqMsg" [(ngModel)]="guestMessage" name="guestMessage" rows="2" placeholder="สอบถามเพิ่มเติม"
                              class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-red-800 outline-hidden"></textarea>
                  </div>

                  <button type="submit"
                          class="w-full py-2.5 rounded-lg bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-xs shadow-md">
                    ส่งข้อความสอบถาม
                  </button>
                </form>
              }

            </div>

          </div>

          <div class="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
            โทรด่วน: <a [href]="config.phoneHref" class="font-bold text-red-900">{{ config.phoneDisplay }}</a>
          </div>

        </div>
      </div>
    }
  `,
})
export class FloatingFaqComponent {
  readonly config = siteConfig;
  readonly inquiryService = inject(InquiryService);

  readonly isOpen = signal(false);
  readonly submitted = signal(false);

  guestName = '';
  guestPhone = '';
  guestLine = '';
  guestMessage = '';

  submitQuickForm() {
    if (!this.guestName || !this.guestPhone) return;
    this.inquiryService.addInquiry({
      type: 'general',
      guestName: this.guestName,
      phone: this.guestPhone,
      email: '',
      lineId: this.guestLine,
      passengersCount: 2,
      message: this.guestMessage,
    });
    this.submitted.set(true);
  }
}
