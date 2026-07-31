import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { siteConfig } from '../../data/site-config';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white min-h-screen py-12">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div class="text-center space-y-3">
          <span class="px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold">ABOUT CHINA PRIME</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900">เกี่ยวกับ CHINA PRIME</h1>
          <p class="text-slate-600 text-sm sm:text-base font-light max-w-2xl mx-auto">
            ผู้เชี่ยวชาญการจัดทริปท่องเที่ยวประเทศจีน มุ่งมั่นส่งมอบประสบการณ์เดินทางคุณภาพสูงสุด
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-4/3">
            <img src="/images/founder-china-prime.jpg" alt="China Prime Team" class="w-full h-full object-cover" referrerpolicy="no-referrer">
          </div>

          <div class="space-y-4 text-slate-700 text-sm leading-relaxed">
            <h2 class="text-2xl font-bold text-slate-900">
              {{ config.companyNameTh }} <br>
              <span class="text-xs text-amber-700 uppercase tracking-wider font-semibold">{{ config.companyNameEn }}</span>
            </h2>
            <p>
              บริษัท ไชน่าไพรม์ จำกัด ก่อตั้งด้วยความตั้งใจที่จะยกระดับมาตรฐานการท่องเที่ยวประเทศจีนสำหรับคนไทย โดยเน้นการจัดทริปคุณภาพสูง ทั้งทัวร์ส่วนตัว (Private Tours) และโปรแกรมจอยทัวร์ที่ไม่เข้าร้านรัฐบาล
            </p>
            <p>
              เราเชื่อมั่นว่า "การท่องเที่ยวคือการพักผ่อนและเปิดโลกทัศน์" ทีมงานของเราจึงพิถีพิถันตั้งแต่การคัดเลือกเส้นทาง บินตรงด้วยสายการบินชั้นนำ พักโรงแรมดาวมาตรฐาน และจัดอาหารมื้อพิเศษรสชาติต้นตำรับ
            </p>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 font-medium">
              <div class="text-slate-900 font-bold">ใบอนุญาตประกอบธุรกิจนำเที่ยว:</div>
              <div class="text-red-900 font-bold text-sm">เลขที่ {{ config.travelLicenseNumber }}</div>
              <div class="text-slate-500 pt-1">ที่ตั้งสำนักงาน: {{ config.addressLines.join(' ') }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
})
export class AboutComponent {
  readonly config = siteConfig;
}
