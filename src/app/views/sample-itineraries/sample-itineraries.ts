import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sample-itineraries',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">SAMPLE ITINERARIES</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900">ตัวอย่างเส้นทางเดินทางจัดทริปจีน</h1>
          <p class="text-slate-600 text-sm sm:text-base font-light">
            ไอเดียเส้นทางท่องเที่ยวสำหรับกรุ๊ปเหมาส่วนตัว ครอบครัว และองค์กรธุรกิจ สามารถปรับเปลี่ยนได้ตามต้องการ
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <span class="px-2.5 py-1 rounded-md bg-red-100 text-red-900 font-bold text-xs">เส้นทางยอดฮิต 6 วัน 5 คืน</span>
              <span class="text-xs text-slate-400">ปักกิ่ง • กำแพงเมืองจีน • พระราชวังต้องห้าม</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900">ทริปเยือนสองมรดกโลกปักกิ่ง ลิ้มรสเป็ดปักกิ่งต้นตำรับ</h3>
            <ul class="space-y-2 text-xs text-slate-600">
              <li><strong class="text-slate-900">วันที่ 1:</strong> บินสู่ปักกิ่ง เช็กอินโรงแรม 4 ดาว ใจกลางเมือง</li>
              <li><strong class="text-slate-900">วันที่ 2:</strong> จัตุรัสเทียนอันเหมิน • พระราชวังต้องห้ามกู้กง • หอเทียนถัน</li>
              <li><strong class="text-slate-900">วันที่ 3:</strong> กำแพงเมืองจีนด่านมู่เถียนยวี่ (ขึ้นกระเช้า) • ย่านถนนหวังฟูจิ่ง</li>
              <li><strong class="text-slate-900">วันที่ 4:</strong> พระราชวังฤดูร้อนอี้เหอหยวน • ผ่านชมสนามมังกรเบิร์ดเนสท์</li>
              <li><strong class="text-slate-900">วันที่ 5:</strong> สวนสาธารณะจิ่งซาน • ช้อปปิ้งห้างซานหลี่ถุน</li>
              <li><strong class="text-slate-900">วันที่ 6:</strong> ช้อปปิ้งของฝาก เดินทางกลับกรุงเทพฯ</li>
            </ul>
            <div class="pt-2">
              <a routerLink="/private-tours" class="inline-flex items-center gap-1 text-xs font-bold text-red-800 hover:underline">
                <span>ขอเสนอราคาเส้นทางนี้</span>
                <mat-icon class="!w-4 !h-4 !text-[16px]">arrow_forward</mat-icon>
              </a>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <span class="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-bold text-xs">ธรรมชาติสุดอลังการ 6 วัน 5 คืน</span>
              <span class="text-xs text-slate-400">จางเจียเจี้ย • หุบเขาอวตาร • ถ้ำหวงหลง</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900">ทริปอวตารจางเจียเจี้ย เขาเทียนเหมินซาน & สะพานแก้ว</h3>
            <ul class="space-y-2 text-xs text-slate-600">
              <li><strong class="text-slate-900">วันที่ 1:</strong> เดินทางสู่ฉางซา พักผ่อนโรงแรมท้องถิ่น</li>
              <li><strong class="text-slate-900">วันที่ 2:</strong> เดินทางสู่จางเจียเจี้ย • ล่องเรือทะเลสาบบ่าเฟิ่งหู</li>
              <li><strong class="text-slate-900">วันที่ 3:</strong> ขึ้นลิฟต์แก้วไป่หลง • เขาอวตารยวนเจียเจี้ย • สะพานอันดับหนึ่งในใต้หล้า</li>
              <li><strong class="text-slate-900">วันที่ 4:</strong> เขาเทียนเหมินซาน (กระเช้าที่ยาวที่สุด) • ระเบียงแก้วเลียบหน้าผา</li>
              <li><strong class="text-slate-900">วันที่ 5:</strong> เมืองโบราณฟู่หรงเจิ้น (น้ำตกกลางเมืองโบราณ)</li>
              <li><strong class="text-slate-900">วันที่ 6:</strong> ช้อปปิ้งถนนคนเดินฉางซา เดินทางกลับกรุงเทพฯ</li>
            </ul>
            <div class="pt-2">
              <a routerLink="/private-tours" class="inline-flex items-center gap-1 text-xs font-bold text-red-800 hover:underline">
                <span>ขอเสนอราคาเส้นทางนี้</span>
                <mat-icon class="!w-4 !h-4 !text-[16px]">arrow_forward</mat-icon>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  `,
})
export class SampleItinerariesComponent {}
