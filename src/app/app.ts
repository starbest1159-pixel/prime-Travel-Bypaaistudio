import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeaderComponent } from './components/site-header';
import { SiteFooterComponent } from './components/site-footer';
import { FloatingFaqComponent } from './components/floating-faq';
import { CookieConsentComponent } from './components/cookie-consent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent, FloatingFaqComponent, CookieConsentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-['Kanit',sans-serif]">
      <app-site-header />
      
      <main class="flex-1">
        <router-outlet />
      </main>

      <app-site-footer />

      <app-floating-faq />
      <app-cookie-consent />
    </div>
  `,
})
export class App {}
