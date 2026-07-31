import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!accepted()) {
      <div class="fixed bottom-0 inset-x-0 z-50 p-4 bg-slate-900/95 text-white border-t border-slate-800 shadow-2xl backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
            <mat-icon class="text-amber-400 shrink-0 mt-0.5">cookie</mat-icon>
            <div>
              <span class="font-bold text-white">นโยบายคุกกี้ (Cookie Policy & PDPA): </span>
              <span>เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งาน ประมวลผลการจองทัวร์ และวิเคราะห์สถิติผู้เข้าชมตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล</span>
              <a routerLink="/privacy-policy" class="text-amber-300 underline font-semibold ml-1">อ่านนโยบายความเป็นส่วนตัว</a>
            </div>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <button (click)="acceptCookies()" type="button"
                    class="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all">
              ยอมรับทั้งหมด
            </button>
            <button (click)="acceptCookies()" type="button"
                    class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-all">
              ปฏิเสธ
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class CookieConsentComponent {
  readonly accepted = signal<boolean>(typeof window !== 'undefined' ? !!localStorage.getItem('cp_cookie_accepted') : false);

  acceptCookies() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cp_cookie_accepted', 'true');
    }
    this.accepted.set(true);
  }
}
