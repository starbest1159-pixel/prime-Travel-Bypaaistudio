import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { JoinToursService } from '../../services/join-tours.service';
import { InquiryService } from '../../services/inquiry.service';
import { JoinTour } from '../../data/join-tours.data';
import { getFoodSummary } from '../../data/food-summary';
import { siteConfig } from '../../data/site-config';

@Component({
  selector: 'app-join-tour-detail',
  standalone: true,
  imports: [RouterLink, MatIconModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (tour(); as tourData) {
      <div class="bg-slate-50 min-h-screen pb-16">
        
        <!-- Hero Header -->
        <div class="relative bg-slate-950 text-white overflow-hidden py-12 lg:py-16">
          <div class="absolute inset-0 z-0">
            <img [src]="tourData.image" [alt]="tourData.title"
                 class="w-full h-full object-cover opacity-25"
                 referrerpolicy="no-referrer">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
          </div>

          <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="space-y-4 max-w-4xl">
              
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-3 py-1 rounded-lg text-xs font-bold bg-red-900 text-amber-300 border border-red-700">
                  รหัสโปรแกรม: {{ tourData.code }}
                </span>
                <span class="px-3 py-1 rounded-lg text-xs font-bold bg-amber-400 text-slate-950">
                  {{ tourData.duration }}
                </span>
                <span class="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
                  {{ tourData.destination }}
                </span>
              </div>

              <h1 class="text-2xl sm:text-4xl font-extrabold leading-tight text-white">
                {{ tourData.title }}
              </h1>

              <p class="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                {{ tourData.subtitle }}
              </p>

              <!-- Locations Chips -->
              <div class="flex flex-wrap items-center gap-2 pt-2">
                <span class="text-xs text-amber-400 font-semibold">ไฮไลท์เมือง:</span>
                @for (loc of tourData.locations; track loc) {
                  <span class="px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-200 text-xs border border-slate-700">
                    {{ loc }}
                  </span>
                }
              </div>

            </div>
          </div>
        </div>

        <!-- Main Content Layout -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Left 2 Cols -->
            <div class="lg:col-span-2 space-y-8">
              
              <div class="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <h3 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <mat-icon class="text-amber-500">star</mat-icon>
                  <span>จุดเด่นโปรแกรมท่องเที่ยวนี้</span>
                </h3>

                <p class="text-sm text-slate-700 leading-relaxed">
                  {{ tourData.highlight }}
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <mat-icon class="text-red-800">restaurant</mat-icon>
                    <div>
                      <div class="font-bold text-slate-900">อาหารมื้อพิเศษ</div>
                      <div class="text-slate-600">{{ getFoodText(tourData) }}</div>
                    </div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <mat-icon class="text-red-800">group</mat-icon>
                    <div>
                      <div class="font-bold text-slate-900">เหมาะกับกลุ่มผู้เดินทาง</div>
                      <div class="text-slate-600">{{ tourData.suitableFor.join(', ') }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Departure Schedule Calendar Table -->
              <div class="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <mat-icon class="text-red-800">calendar_month</mat-icon>
                    <span>ตารางวันเดินทาง & กำหนดการ</span>
                  </h3>
                  <span class="text-xs text-slate-500">ที่นั่งเปิดรับจอง</span>
                </div>

                <div class="divide-y divide-slate-100">
                  @if (tourData.departureSchedules && tourData.departureSchedules.length > 0) {
                    @for (sched of tourData.departureSchedules; track sched.date) {
                      <div class="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div class="font-bold text-sm text-slate-900">{{ sched.date }}</div>
                          <div class="text-xs text-emerald-700 font-medium">{{ sched.availability }}</div>
                        </div>
                        <div class="flex items-center gap-3">
                          <div class="text-right">
                            <div class="text-[10px] text-slate-400">ราคา/ท่าน</div>
                            <div class="font-extrabold text-red-900 text-base">{{ sched.price }}</div>
                          </div>
                          <button (click)="openInquiryModal(sched.date)" type="button"
                                  class="px-4 py-2 rounded-xl bg-red-900 hover:bg-red-800 text-amber-200 text-xs font-bold shadow-xs">
                            จอง / เช็กที่นั่ง
                          </button>
                        </div>
                      </div>
                    }
                  } @else {
                    @for (mDate of tourData.travelDates; track mDate) {
                      <div class="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div class="font-bold text-sm text-slate-900">รอบเดินทาง {{ mDate }}</div>
                          <div class="text-xs text-emerald-700 font-medium">เปิดรับจอง / สอบถามรอบบินล่าสุด</div>
                        </div>
                        <div class="flex items-center gap-3">
                          <div class="text-right">
                            <div class="text-[10px] text-slate-400">ราคาเริ่มต้น</div>
                            <div class="font-extrabold text-red-900 text-base">{{ tourData.price }}</div>
                          </div>
                          <button (click)="openInquiryModal(mDate)" type="button"
                                  class="px-4 py-2 rounded-xl bg-red-900 hover:bg-red-800 text-amber-200 text-xs font-bold shadow-xs">
                            สอบถามรอบนี้
                          </button>
                        </div>
                      </div>
                    }
                  }
                </div>
              </div>

              <!-- Itinerary Days -->
              <div class="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-6">
                <h3 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <mat-icon class="text-amber-600">map</mat-icon>
                  <span>กำหนดการเดินทางแบบวันต่อวัน (Itinerary)</span>
                </h3>

                <div class="space-y-4">
                  @for (day of tourData.itinerary; track day.day) {
                    <div class="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2">
                      <div class="flex items-center gap-2 text-xs font-bold text-red-900">
                        <span class="px-2.5 py-1 rounded bg-red-100 text-red-900">{{ day.day }}</span>
                        <span class="text-base font-extrabold text-slate-900">{{ day.title }}</span>
                      </div>
                      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-light pl-1">
                        {{ day.text }}
                      </p>
                    </div>
                  }
                </div>
              </div>

            </div>

            <!-- Right Col Sidebar -->
            <div class="space-y-6">
              
              <div class="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md sticky top-28 space-y-5">
                <div>
                  <div class="text-xs text-slate-400 uppercase tracking-wider">ราคาแพ็กเกจเริ่มต้น</div>
                  <div class="text-3xl font-extrabold text-red-900 mt-1">
                    {{ tourData.price }}
                  </div>
                  <div class="text-xs text-slate-500 mt-0.5">รวมตั๋วเครื่องบิน + โรงแรม + อาหารตามรายการ</div>
                </div>

                <div class="space-y-2 pt-2">
                  <button (click)="openInquiryModal('')" type="button"
                          class="w-full py-3 rounded-xl bg-gradient-to-r from-red-800 to-red-950 hover:from-red-900 hover:to-black text-amber-200 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2">
                    <mat-icon class="!w-4 !h-4 !text-[18px]">send</mat-icon>
                    <span>จอง/สอบถามที่นั่งโปรแกรมนี้</span>
                  </button>

                  <a [href]="config.lineUrl" target="_blank" rel="noopener noreferrer"
                     class="w-full py-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-100 transition-all">
                    <span class="font-bold text-emerald-600">LINE</span>
                    <span>แชตสอบถามทันที</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

        <!-- Booking Inquiry Modal -->
        @if (showInquiryModal()) {
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
            <div class="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
              <button (click)="showInquiryModal.set(false)" type="button" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <mat-icon>close</mat-icon>
              </button>

              <h3 class="text-xl font-bold text-slate-900 mb-1">สอบถาม/จองทัวร์ {{ tourData.code }}</h3>
              <p class="text-xs text-slate-500 mb-4">{{ tourData.title }}</p>

              @if (submitted()) {
                <div class="p-6 rounded-xl bg-emerald-50 text-center space-y-3">
                  <mat-icon class="!w-10 !h-10 !text-[40px] text-emerald-600">check_circle</mat-icon>
                  <div class="font-bold text-emerald-900 text-base">บันทึกการสอบถามเรียบร้อยแล้ว!</div>
                  <p class="text-xs text-emerald-700">เจ้าหน้าที่จะติดต่อกลับยืนยันที่นั่ง และท่านสามารถแนบสลิปชำระเงินได้ในหน้ารายการจอง</p>
                  <div class="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <a routerLink="/account" (click)="showInquiryModal.set(false); submitted.set(false)"
                       class="px-4 py-2 bg-red-900 hover:bg-red-800 text-amber-200 rounded-xl text-xs font-bold shadow-xs">
                      ดูรายการจอง & แนบสลิป (/account)
                    </a>
                    <button (click)="showInquiryModal.set(false); submitted.set(false)" type="button"
                            class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold">
                      เสร็จสิ้น
                    </button>
                  </div>
                </div>
              } @else {
                <form (ngSubmit)="submitBooking(tourData)" class="space-y-3">
                  <div>
                    <label for="jtdDate" class="block text-xs font-semibold text-slate-700 mb-1">รอบวันเดินทางที่สนใจ</label>
                    <input id="jtdDate" [(ngModel)]="selectedDepartureDate" name="selectedDepartureDate" type="text"
                           class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50">
                  </div>

                  <div>
                    <label for="jtdName" class="block text-xs font-semibold text-slate-700 mb-1">ชื่อ-นามสกุล ผู้ติดต่อ *</label>
                    <input id="jtdName" [(ngModel)]="guestName" name="guestName" required type="text" placeholder="ระบุชื่อของคุณ"
                           class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-800 outline-hidden">
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label for="jtdPhone" class="block text-xs font-semibold text-slate-700 mb-1">เบอร์โทรศัพท์ *</label>
                      <input id="jtdPhone" [(ngModel)]="guestPhone" name="guestPhone" required type="tel" placeholder="08X-XXX-XXXX"
                             class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-800 outline-hidden">
                    </div>
                    <div>
                      <label for="jtdCount" class="block text-xs font-semibold text-slate-700 mb-1">จำนวนผู้เดินทาง</label>
                      <input id="jtdCount" [(ngModel)]="passengersCount" name="passengersCount" type="number" min="1"
                             class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-800 outline-hidden">
                    </div>
                  </div>

                  <div>
                    <label for="jtdLine" class="block text-xs font-semibold text-slate-700 mb-1">LINE ID</label>
                    <input id="jtdLine" [(ngModel)]="guestLine" name="guestLine" type="text" placeholder="เช่น &#64;lineid"
                           class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-800 outline-hidden">
                  </div>

                  <button type="submit"
                          class="w-full py-3 rounded-xl bg-red-900 hover:bg-red-800 text-amber-200 font-bold text-sm shadow-md mt-2">
                    ส่งข้อมูลจอง / เช็กที่นั่ง
                  </button>
                </form>
              }

            </div>
          </div>
        }

      </div>
    } @else {
      <div class="py-24 text-center space-y-4">
        <mat-icon class="!w-12 !h-12 !text-[48px] text-slate-400">error_outline</mat-icon>
        <h2 class="text-xl font-bold text-slate-800">ไม่พบโปรแกรมทัวร์นี้</h2>
        <a routerLink="/join-tours" class="inline-block px-4 py-2 bg-red-900 text-amber-200 text-xs font-bold rounded-xl">
          กลับไปดูโปรแกรมทัวร์ทั้งหมด
        </a>
      </div>
    }
  `,
})
export class JoinTourDetailComponent {
  readonly route = inject(ActivatedRoute);
  readonly joinToursService = inject(JoinToursService);
  readonly inquiryService = inject(InquiryService);
  readonly config = siteConfig;

  readonly tour = signal<JoinTour | undefined>(undefined);
  readonly showInquiryModal = signal(false);
  readonly submitted = signal(false);

  selectedDepartureDate = '';
  guestName = '';
  guestPhone = '';
  guestLine = '';
  passengersCount = 2;

  constructor() {
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.tour.set(this.joinToursService.getTourBySlug(slug));
      }
    });
  }

  getFoodText(tour: JoinTour) {
    return getFoodSummary(tour);
  }

  openInquiryModal(date: string) {
    this.selectedDepartureDate = date || (this.tour()?.travelDates[0] ?? '');
    this.showInquiryModal.set(true);
  }

  submitBooking(tour: JoinTour) {
    if (!this.guestName || !this.guestPhone) return;
    this.inquiryService.addInquiry({
      type: 'join-tour',
      tourTitle: tour.title,
      tourSlug: tour.slug,
      departureDate: this.selectedDepartureDate,
      guestName: this.guestName,
      phone: this.guestPhone,
      email: '',
      lineId: this.guestLine,
      passengersCount: this.passengersCount,
    });
    this.submitted.set(true);
  }
}
