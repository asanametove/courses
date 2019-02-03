import { Component, OnInit, OnDestroy } from '@angular/core';
import { Breadcrumb } from '@shared/breadcrumb';
import { LoginService } from '../login/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesService } from '@core/courses/courses.service';

@Component({
  selector: 'courses-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  private routerStateChange: Subscription;
  private stateNamesMap = {
    courses: 'Courses',
    new: 'New course',
  };
  breadcrumbs: Breadcrumb[];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private coursesService: CoursesService,
  ) {}

  ngOnInit() {
    this.routerStateChange = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.update(event.url);
      }
    });
  }

  ngOnDestroy() {
    this.routerStateChange.unsubscribe();
  }

  get loggedIn() {
    return this.loginService.isLoggedIn();
  }

  private update(url: string) {
    this.breadcrumbs = url
      .split('/')
      .filter(Boolean)
      .map((urlPart) => new Breadcrumb(this.getText(urlPart), urlPart));

    this.breadcrumbs[this.breadcrumbs.length - 1].isActive = true;
  }

  private getText(urlPart: string): string {
    return this.stateNamesMap[urlPart]
      || this.coursesService.getCourseById(urlPart).title;
  }
}
