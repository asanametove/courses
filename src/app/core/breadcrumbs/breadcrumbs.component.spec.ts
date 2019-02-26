import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { LoginService } from '../login/login.service';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { Breadcrumb } from '@shared/breadcrumb';
import { CoursesService } from '@core/courses/courses.service';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let routerEvents$: Subject<NavigationEnd>;
  const url = 'courses/1';

  beforeEach(async(() => {
    loginService = jasmine.createSpyObj('loginService', ['isLoggedIn']);
    coursesService = jasmine.createSpyObj('CoursesService', ['getCourseById']);
    routerEvents$ = new Subject();

    TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ],
      imports: [ RouterModule ],
      providers: [
        { provide: LoginService, useValue: loginService },
        { provide: Router, useValue: { events: routerEvents$ } },
        { provide: CoursesService, useValue: coursesService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    // TODO need to rework breadcrumbs creation logic
    xit('should update breadcrumbs on NavigationEnd', () => {
      const title = 'title';
      coursesService.getCourseById.and.returnValue({ title });
      routerEvents$.next(new NavigationEnd(null, null, url));
      expect(component.breadcrumbs).toEqual([
        new Breadcrumb('Courses', 'courses'),
        new Breadcrumb(title, '1', true),
      ]);
    });
  });

  describe('#ngOnDestroy', () => {
    it('should unsubscribe from router events on destroy', () => {
      fixture.destroy();
      routerEvents$.next(new NavigationEnd(null, url, null));
      expect(component.breadcrumbs).toBeUndefined();
    });
  });
});
