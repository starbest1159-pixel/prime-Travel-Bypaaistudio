import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">CUSTOMER REVIEWS</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900">เสียงตอบรับและรีวิวจากผู้ใช้บริการจริง</h1>
          <p class="text-slate-600 text-sm sm:text-base font-light">
            ความประทับใจของลูกค้าที่ร่วมเดินทางไปกับ CHINA PRIME ทั้งกรุ๊ปทัวร์ส่วนตัว และจอยทัวร์
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center gap-1 text-amber-400">
              <mat-icon>star</mat-icon><mat-icon>star</mat-icon><mat-icon>star</mat-icon><mat-icon>star</mat-icon><mat-icon>star</mat-icon>
            </div>
            <p class="text-xs text-slate-700 leading-relaxed font-light">
              "ทริปทัวร์ส่วนตัวปักกิ่งพาครอบครัว 6 คนไปเที่ยว ไกด์ดูแลดีมาก ให้ความรู้ประวัติศาสตร์แน่น รถตู้สะอาดสะอ้าน ไม่ต้องรอใคร ประทับใจมากค่ะ!"
            </p>
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div class="font-bold text-slate-900">คุณศิริพร และครอบครัว</div>
              <div class="text-slate-400">กรุงเทพฯ • ทริปปักกิ่งส่วนตัว</div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center gap-1 text-amber-400">
              <mat-icon>star</mat-icon><mat-icon>star</mat-icon><mat-icon>star</mat-icon><mat-icon>star</mat-icon><mat-icon>star</mat-icon>
            </div>
            <p class="text-xs text-slate-700 leading-relaxed font-light">
              "ไปจอยทัวร์จางเจียเจี้ยกับแฟน ประทับใจตรงที่ไม่เข้าร้านรัฐบาล ได้เที่ยวเต็มที่ทั้งวัน วิวเขาอวตารสวยอลังการจริง ๆ ครับ"
            </p>
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div class="font-bold text-slate-900">คุณธนกฤต</div>
              <div class="text-slate-400">เชียงใหม่ • จอยทัวร์จางเจียเจี้ย</div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center gap-1 text-amber-400">
              <mat-icon>star</mat-icon><mat-icon>star</mat-icon><mat-icon>star</mat-icon><mat-icon>star</mat-icon><mat-icon>star</mat-icon>
            </div>
            <p class="text-xs text-slate-700 leading-relaxed font-light">
              "จัดกรุ๊ปสัมมนาบริษัท 18 คน ไปเซี่ยงไฮ้-หางโจว ทีมงานจัดอาหารดีมาก ทุกมื้ออร่อย ติดต่อประสานงานรวดเร็ว เป็นมืออาชีพสุด ๆ"
            </p>
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div class="font-bold text-slate-900">คุณนพดล (CEO)</div>
              <div class="text-slate-400">ชลบุรี • ทริปองค์กรเซี่ยงไฮ้</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
})
export class ReviewsComponent {}
