import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {
  constructor(
    private router: Router,
  ) {}

  static pages = {
    root: 'root',
    login: 'login',
  };

  static routes = {
    [NavigationService.pages.root]: '/',
    [NavigationService.pages.login]: '/login',
  };

  isOnPage(page: string): boolean {
    return NavigationService.routes[page] === this.router.url;
  }

  navigateByUrl(page: string): void {
    this.router.navigateByUrl(NavigationService.routes[page]);
  }
}
