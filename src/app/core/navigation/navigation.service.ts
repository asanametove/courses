import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteName } from '@shared/route-name';

@Injectable()
export class NavigationService {
  constructor(
    private router: Router,
  ) {}

  isOnPage(route: RouteName): boolean {
    return this.router.url === route;
  }

  navigateByUrl(route: RouteName): void {
    this.router.navigateByUrl(route);
  }
}
