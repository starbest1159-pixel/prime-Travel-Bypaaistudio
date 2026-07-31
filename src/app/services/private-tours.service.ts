import { Injectable, signal } from '@angular/core';
import { privateToursData, PrivateToursContent, PrivatePackage } from '../data/private-tours.data';

@Injectable({
  providedIn: 'root',
})
export class PrivateToursService {
  readonly content = signal<PrivateToursContent>(privateToursData);

  getPackageBySlug(slug: string): PrivatePackage | undefined {
    return this.content().packages.find((p: PrivatePackage) => p.slug === slug);
  }
}
