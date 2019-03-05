import { Component, OnInit, OnDestroy } from '@angular/core';
import { Breadcrumb } from '@shared/breadcrumb';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesService } from '@core/courses/courses.service';
import { CourseNotFoundError } from '@shared/errors';

@Component({
  selector: 'courses-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  private routerStateChange: Subscription;
  public isVisible: boolean;
  breadcrumbs: Breadcrumb[];

  constructor(
    private router: Router,
    private coursesService: CoursesService,
  ) {}

  ngOnInit() {
    this.routerStateChange = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isVisible = false;
        try {
          this.update(event.urlAfterRedirects);
        } catch (error) {
          if (!(error instanceof CourseNotFoundError)) {
            throw error;
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.routerStateChange.unsubscribe();
  }

  private update(url: string) {
    this.breadcrumbs = url
      .split('/')
      .filter(Boolean)
      .map((urlPart) => new Breadcrumb(this.getText(urlPart), urlPart));

    const { length } = this.breadcrumbs;
    if (length) {
      this.breadcrumbs[length - 1].isActive = true;
      this.isVisible = true;
    }
  }

  private getText(urlPart: string): string {
    const route = this.router.config.find(({ path }) => path.includes(urlPart));
    return 'Title';

    // return route && route.data
    //   ? route.data.label
    //   : this.coursesService.getCourseById(urlPart).title;
  }
}
