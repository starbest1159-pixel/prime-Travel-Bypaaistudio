import { Injectable, signal, computed } from '@angular/core';
import { joinToursData, JoinTour } from '../data/join-tours.data';

export interface HomeDestination {
  title: string;
  subtitle: string;
  image: string;
  categories: string[];
}

export const HOME_DESTINATIONS: HomeDestination[] = [
  {
    title: 'ปักกิ่ง',
    subtitle: 'เมืองหลวงประวัติศาสตร์ มรดกโลกกำแพงเมืองจีน',
    image: '/images/beijing-forbidden-city.jpg',
    categories: ['ประวัติศาสตร์', 'ช้อปปิ้ง', 'อาหาร'],
  },
  {
    title: 'เซี่ยงไฮ้',
    subtitle: 'มหานครลักชัวรี ดิสนีย์แลนด์ เมืองโบราณอู๋เจิ้น',
    image: '/images/shanghai-skyline.jpg',
    categories: ['ทันสมัย', 'สวนสนุก', 'ลักชัวรี'],
  },
  {
    title: 'จางเจียเจี้ย',
    subtitle: 'หุบเขาอวตาร ลิฟต์แก้วแนวดิ่ง เขาเทียนเหมินซาน',
    image: '/images/zhangjiajie-mountains.jpg',
    categories: ['ธรรมชาติ', 'ถ่ายภาพ', 'ผจญภัย'],
  },
];

@Injectable({
  providedIn: 'root',
})
export class JoinToursService {
  readonly allTours = signal<JoinTour[]>(joinToursData);
  readonly homeDestinations = signal<HomeDestination[]>(HOME_DESTINATIONS);

  getTourBySlug(slug: string): JoinTour | undefined {
    return this.allTours().find((t) => t.slug === slug);
  }

  readonly availableTags = computed(() => {
    const tags = new Set<string>();
    this.allTours().forEach((t) => {
      t.tags?.forEach((tag: string) => tags.add(tag));
    });
    return Array.from(tags);
  });
}
