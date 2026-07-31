import { Injectable, signal, effect } from '@angular/core';

export interface TourInquiry {
  id: string;
  type: 'join-tour' | 'private-tour' | 'general';
  tourTitle?: string;
  tourSlug?: string;
  departureDate?: string;
  guestName: string;
  phone: string;
  email: string;
  lineId?: string;
  passengersCount: number;
  budgetPerPerson?: string;
  message?: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'confirmed';
}

@Injectable({
  providedIn: 'root',
})
export class InquiryService {
  private readonly storageKey = 'china_prime_inquiries';
  readonly inquiries = signal<TourInquiry[]>(this.loadInquiries());

  constructor() {
    effect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.inquiries()));
      }
    });
  }

  private loadInquiries(): TourInquiry[] {
    const defaultInitial: TourInquiry[] = [
      {
        id: 'CP-884912',
        type: 'join-tour',
        tourTitle: 'ปักกิ่ง กำแพงเมืองจีน หวังฝูจิ่ง 5 วัน 4 คืน (CP-BJ01)',
        tourSlug: 'beijing-great-wall-5d4n',
        departureDate: '15-19 ต.ค. 2026',
        guestName: 'คุณสมชาย วงศ์สว่าง',
        phone: '081-234-5678',
        email: 'somchai@example.com',
        passengersCount: 2,
        createdAt: new Date().toISOString(),
        status: 'pending',
      },
      {
        id: 'CP-743120',
        type: 'private-tour',
        tourTitle: 'ทัวร์ส่วนตัว VIP: เซี่ยงไฮ้ ดิสนีย์แลนด์ เมืองโบราณอู๋เจิ้น 5 วัน 3 คืน',
        guestName: 'คุณสมชาย วงศ์สว่าง',
        phone: '081-234-5678',
        email: 'somchai@example.com',
        passengersCount: 4,
        message: 'ต้องการรถตู้ VIP และไกด์พูดไทยตลอดทริป',
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      },
    ];

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : defaultInitial;
      } catch {
        return defaultInitial;
      }
    }
    return defaultInitial;
  }

  addInquiry(inquiry: Omit<TourInquiry, 'id' | 'createdAt' | 'status'>): TourInquiry {
    const newInquiry: TourInquiry = {
      ...inquiry,
      id: 'CP-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    this.inquiries.set([newInquiry, ...this.inquiries()]);
    return newInquiry;
  }
}
