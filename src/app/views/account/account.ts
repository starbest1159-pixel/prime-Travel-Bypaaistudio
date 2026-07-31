import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { InquiryService } from '../../services/inquiry.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <!-- Header User Card -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-full bg-red-900 text-amber-200 font-bold text-xl flex items-center justify-center shadow-md">
              {{ isLoggedIn() ? 'M' : 'G' }}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-xl font-bold text-slate-900">{{ isLoggedIn() ? memberName : 'สมาชิกรับสิทธิพิเศษ' }}</h1>
                <span [class]="isLoggedIn() ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'"
                      class="px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  {{ isLoggedIn() ? 'VIP MEMBER' : 'GUEST' }}
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">
                {{ isLoggedIn() ? 'สมาชิก CHINA PRIME • สะสมแต้มรับส่วนลดจองทัวร์' : 'เข้าสู่ระบบเพื่อดูประวัติการจอง แนบสลิปโอนเงิน และดาวน์โหลดเอกสาร' }}
              </p>
            </div>
          </div>

          <button (click)="toggleAuthModal()" type="button"
                  class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs shadow-xs self-start sm:self-center">
            {{ isLoggedIn() ? 'ออกจากระบบ' : 'เข้าสู่ระบบ / สมัครสมาชิก' }}
          </button>
        </div>

        <!-- Bookings & Inquiries History Section -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
              <mat-icon class="text-red-800">assignment</mat-icon>
              <span>ประวัติการจอง & ขอใบเสนอราคา</span>
            </h2>
            <span class="text-xs font-semibold text-slate-500">ทั้งหมด {{ inquiries().length }} รายการ</span>
          </div>

          @if (inquiries().length > 0) {
            <div class="space-y-4">
              @for (inq of inquiries(); track inq.id) {
                <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-4 text-xs">
                  
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div>
                      <span class="text-slate-400 text-[11px]">เลขที่อ้างอิง:</span>
                      <span class="font-extrabold text-slate-900 ml-1 text-sm">#{{ inq.id }}</span>
                    </div>
                    
                    <div class="flex items-center gap-2">
                      <span [class]="inq.status === 'pending' ? 'bg-amber-100 text-amber-900 border-amber-200' : 'bg-emerald-100 text-emerald-900 border-emerald-200'"
                            class="px-3 py-1 rounded-full font-bold text-[10px] border">
                        {{ inq.status === 'pending' ? 'รอเจ้าหน้าที่ติดต่อกลับ/ตรวจสอบสลิป' : 'ยืนยันการจองเรียบร้อย' }}
                      </span>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                    <div>
                      <div class="font-bold text-slate-900 text-sm mb-1">{{ inq.tourTitle || 'สอบถามข้อมูลจัดกรุ๊ปทัวร์' }}</div>
                      <div>ผู้ติดต่อ: <span class="font-semibold text-slate-900">{{ inq.guestName }}</span></div>
                      <div>โทร: <span class="font-semibold text-slate-900">{{ inq.phone }}</span></div>
                      @if (inq.email) { <div>อีเมล: {{ inq.email }}</div> }
                    </div>

                    <div class="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <div class="font-bold text-slate-800">รายละเอียดจำนวนผู้เดินทาง:</div>
                      <div>จำนวนผู้เดินทาง: <span class="font-bold text-red-900">{{ inq.passengersCount }} ท่าน</span></div>
                      @if (inq.departureDate) { <div>วันเดินทางที่เลือก: <span class="font-semibold text-slate-900">{{ inq.departureDate }}</span></div> }
                    </div>
                  </div>

                  <!-- Actions: Slip Upload & Voucher Download -->
                  <div class="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3">
                    <div class="flex items-center gap-2">
                      <button (click)="openSlipUpload(inq.id)" type="button"
                              class="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-xs">
                        <mat-icon class="!w-4 !h-4 !text-[16px]">receipt_long</mat-icon>
                        <span>แนบหลักฐานชำระเงิน (สลิป)</span>
                      </button>

                      <button (click)="downloadVoucher(inq.id)" type="button"
                              class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs">
                        <mat-icon class="!w-4 !h-4 !text-[16px]">download</mat-icon>
                        <span>ดาวน์โหลดใบยืนยัน/เอกสารทัวร์</span>
                      </button>
                    </div>

                    @if (uploadedSlips()[inq.id]) {
                      <span class="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <mat-icon class="!w-4 !h-4 !text-[16px]">check_circle</mat-icon>
                        <span>แนบหลักฐานแล้ว (อยู่ระหว่างตรวจสอบ)</span>
                      </span>
                    }
                  </div>

                </div>
              }
            </div>
          } @else {
            <div class="text-center py-12 text-slate-400 text-xs space-y-3">
              <mat-icon class="!w-10 !h-10 !text-[40px] text-slate-300">receipt</mat-icon>
              <div>ยังไม่มีประวัติการจองหรือสอบถามในเซสชันนี้</div>
            </div>
          }
        </div>

      </div>
    </div>

    <!-- Auth Modal (Sign in / Sign up) -->
    @if (showAuthModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <div class="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5 border border-slate-200">
          <div class="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 class="font-bold text-slate-900 text-base">เข้าสู่ระบบสมาชิก CHINA PRIME</h3>
            <button (click)="showAuthModal.set(false)" type="button" class="text-slate-400 hover:text-slate-600">
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <form (ngSubmit)="handleLogin()" class="space-y-4 text-xs">
            <div>
              <label for="accEmail" class="block font-semibold text-slate-700 mb-1">เบอร์โทรศัพท์ / อีเมล</label>
              <input id="accEmail" [(ngModel)]="loginEmail" name="loginEmail" required type="text" placeholder="08X-XXX-XXXX"
                     class="w-full px-3 py-2.5 rounded-xl border border-slate-300 outline-hidden focus:ring-2 focus:ring-red-800">
            </div>

            <div>
              <label for="accPass" class="block font-semibold text-slate-700 mb-1">รหัสผ่าน</label>
              <input id="accPass" [(ngModel)]="loginPass" name="loginPass" required type="password" placeholder="••••••••"
                     class="w-full px-3 py-2.5 rounded-xl border border-slate-300 outline-hidden focus:ring-2 focus:ring-red-800">
            </div>

            <button type="submit" class="w-full py-3 rounded-xl bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-xs shadow-md">
              เข้าสู่ระบบสมาชิก
            </button>
          </form>
        </div>
      </div>
    }

    <!-- Slip Upload Modal -->
    @if (showUploadModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <div class="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5 border border-slate-200">
          <div class="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
              <mat-icon class="text-red-800">cloud_upload</mat-icon>
              <span>แนบหลักฐานชำระเงิน</span>
            </h3>
            <button (click)="showUploadModal.set(false)" type="button" class="text-slate-400 hover:text-slate-600">
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div class="font-bold text-slate-900">ธนาคารกสิกรไทย (K-Bank)</div>
              <div class="text-red-900 font-extrabold text-sm">เลขที่บัญชี: 123-4-56789-0</div>
              <div class="text-slate-600">ชื่อบัญชี: บจก. ไชน่า ไพรม์ ทราเวล (China Prime Travel Co., Ltd.)</div>
            </div>

            <div>
              <label for="slipFile" class="block font-semibold text-slate-700 mb-1">เลือกไฟล์สลิปโอนเงิน (JPG, PNG, PDF)</label>
              <input id="slipFile" type="file" (change)="onFileSelected()"
                     class="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs">
            </div>

            <button (click)="confirmUpload()" type="button"
                    class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md">
              ยืนยันการแนบหลักฐาน
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class AccountComponent {
  readonly inquiryService = inject(InquiryService);
  readonly inquiries = this.inquiryService.inquiries;

  readonly isLoggedIn = signal(false);
  readonly showAuthModal = signal(false);
  readonly showUploadModal = signal(false);
  readonly selectedInquiryId = signal<string | null>(null);

  readonly uploadedSlips = signal<Record<string, boolean>>({});

  memberName = 'คุณสมชาย วงศ์สว่าง';
  loginEmail = '';
  loginPass = '';

  toggleAuthModal() {
    if (this.isLoggedIn()) {
      this.isLoggedIn.set(false);
    } else {
      this.showAuthModal.set(true);
    }
  }

  handleLogin() {
    this.isLoggedIn.set(true);
    this.showAuthModal.set(false);
  }

  openSlipUpload(inquiryId: string) {
    this.selectedInquiryId.set(inquiryId);
    this.showUploadModal.set(true);
  }

  onFileSelected() {
    // File selected handler
  }

  confirmUpload() {
    const id = this.selectedInquiryId();
    if (id) {
      this.uploadedSlips.update((prev) => ({ ...prev, [id]: true }));
    }
    this.showUploadModal.set(false);
    alert('ระบบได้รับหลักฐานชำระเงินเรียบร้อยแล้ว เจ้าหน้าที่จะตรวจสอบภายใน 15 นาที');
  }

  downloadVoucher(inquiryId: string) {
    alert(`ดาวน์โหลดเอกสารยืนยันการเดินทางสำหรับใบจอง #${inquiryId} เรียบร้อยแล้ว`);
  }
}
