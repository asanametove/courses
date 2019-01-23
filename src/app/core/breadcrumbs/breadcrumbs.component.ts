import { Component } from '@angular/core';
import { Breadcrumb } from '@shared/breadcrumb';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'courses-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent {
  crumbs = [
    new Breadcrumb('Fake', '#'),
    new Breadcrumb('Courses', '#'),
    new Breadcrumb('Breadcrumbs', '#'),
  ];

  constructor(
    private loginService: LoginService,
  ) {}

  get loggedIn() {
    return this.loginService.isLoggedIn();
  }
}
