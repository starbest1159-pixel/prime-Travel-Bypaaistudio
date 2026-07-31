import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'join-tours',
    loadComponent: () => import('./views/join-tours/join-tours').then((m) => m.JoinToursComponent),
  },
  {
    path: 'join-tours/:slug',
    loadComponent: () => import('./views/join-tours/join-tour-detail').then((m) => m.JoinTourDetailComponent),
  },
  {
    path: 'private-tours',
    loadComponent: () => import('./views/private-tours/private-tours').then((m) => m.PrivateToursComponent),
  },
  {
    path: 'destinations',
    loadComponent: () => import('./views/destinations/destinations').then((m) => m.DestinationsComponent),
  },
  {
    path: 'sample-itineraries',
    loadComponent: () => import('./views/sample-itineraries/sample-itineraries').then((m) => m.SampleItinerariesComponent),
  },
  {
    path: 'articles',
    loadComponent: () => import('./views/articles/articles').then((m) => m.ArticlesComponent),
  },
  {
    path: 'articles/:slug',
    loadComponent: () => import('./views/articles/article-detail').then((m) => m.ArticleDetailComponent),
  },
  {
    path: 'reviews',
    loadComponent: () => import('./views/reviews/reviews').then((m) => m.ReviewsComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./views/about/about').then((m) => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./views/contact/contact').then((m) => m.ContactComponent),
  },
  {
    path: 'favorites',
    loadComponent: () => import('./views/favorites/favorites').then((m) => m.FavoritesComponent),
  },
  {
    path: 'account',
    loadComponent: () => import('./views/account/account').then((m) => m.AccountComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./views/admin/admin').then((m) => m.AdminComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./views/policies/policy-pages').then((m) => m.PolicyPagesComponent),
  },
  {
    path: 'booking-payment',
    loadComponent: () => import('./views/policies/policy-pages').then((m) => m.PolicyPagesComponent),
  },
  {
    path: 'cancellation-refund',
    loadComponent: () => import('./views/policies/policy-pages').then((m) => m.PolicyPagesComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
