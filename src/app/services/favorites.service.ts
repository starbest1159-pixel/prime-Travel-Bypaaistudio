import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly storageKey = 'china_prime_favorites';
  readonly favoriteSlugs = signal<string[]>(this.loadFavorites());

  readonly count = computed(() => this.favoriteSlugs().length);

  constructor() {
    effect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.favoriteSlugs()));
      }
    });
  }

  private loadFavorites(): string[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  isFavorite(slug: string): boolean {
    return this.favoriteSlugs().includes(slug);
  }

  toggleFavorite(slug: string): boolean {
    const current = this.favoriteSlugs();
    if (current.includes(slug)) {
      this.favoriteSlugs.set(current.filter((s) => s !== slug));
      return false;
    } else {
      this.favoriteSlugs.set([...current, slug]);
      return true;
    }
  }
}
