import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-policy-pages',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white min-h-screen py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        @if (pageType() === 'privacy-policy') {
          <h1 class="text-3xl font-bold text-slate-900 border-b border-slate-200 pb-4">นโยบายความเป็นส่วนตัว (Privacy Policy)</h1>
          <div class="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
            <p>บริษัท ไชน่าไพรม์ จำกัด ตระหนักถึงความสำคัญของการคุ้มครองข้อมูลส่วนบุคคลของผู้ใช้บริการทุกท่าน โดยข้อมูลที่จัดเก็บจะใช้เพื่อวัตถุประสงค์ในการจองและประสานงานทริปท่องเที่ยวเท่านั้น</p>
            <h3 class="font-bold text-slate-900 text-base">การจัดเก็บข้อมูลส่วนบุคคล</h3>
            <p>บริษัทจะจัดเก็บข้อมูลเช่น ชื่อ-นามสกุล, เบอร์โทรศัพท์, LINE ID, อีเมล และข้อมูลหนังสือเดินทาง เพื่อใช้ในการออกตั๋วเครื่องบิน จองโรงแรม และทำประกันภัยการเดินทาง</p>
          </div>
        } @else if (pageType() === 'booking-payment') {
          <h1 class="text-3xl font-bold text-slate-900 border-b border-slate-200 pb-4">ขั้นตอนการจองและชำระเงิน</h1>
          <div class="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
            <h3 class="font-bold text-slate-900 text-base">1. การมัดจำที่นั่ง</h3>
            <p>เมื่อได้รับการยืนยันที่นั่งจากเจ้าหน้าที่ ชำระเงินมัดจำท่านละ 10,000 - 15,000 บาท ภายใน 3 วันทำการ</p>
            <h3 class="font-bold text-slate-900 text-base">2. การชำระส่วนที่เหลือ</h3>
            <p>ชำระเงินส่วนที่เหลือก่อนวันเดินทางอย่างน้อย 21 - 30 วัน พร้อมส่งเอกสารหน้าพาสปอร์ตสำหรับเตรียมการเข้าเมือง</p>
          </div>
        } @else {
          <h1 class="text-3xl font-bold text-slate-900 border-b border-slate-200 pb-4">เงื่อนไขการยกเลิกและการคืนเงิน</h1>
          <div class="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
            <p>การยกเลิกการเดินทางให้เป็นไปตามพระราชบัญญัติธุรกิจนำเที่ยวและมัคคุเทศก์ ดังนี้:</p>
            <ul class="list-disc list-inside space-y-2">
              <li>ยกเลิกก่อนวันเดินทาง 30 วันขึ้นไป: คืนเงินมัดจำทั้งหมด (หักค่าใช้จ่ายที่เกิดขึ้นจริงถ้ามี)</li>
              <li>ยกเลิกก่อนวันเดินทาง 15-29 วัน: หักเงินมัดจำ 50%</li>
              <li>ยกเลิกน้อยกว่า 15 วันก่อนเดินทาง: สงวนสิทธิ์การคืนเงินทุกกรณี</li>
            </ul>
          </div>
        }

      </div>
    </div>
  `,
})
export class PolicyPagesComponent {
  readonly route = inject(ActivatedRoute);
  readonly pageType = signal<string>('privacy-policy');

  constructor() {
    this.route.url.subscribe((segments) => {
      if (segments.length > 0) {
        this.pageType.set(segments[0].path);
      }
    });
  }
}
