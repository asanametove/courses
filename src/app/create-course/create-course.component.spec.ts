import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseComponent } from './create-course.component';
import { FormsModule } from '@angular/forms';
import { RouteName } from '@shared/route-name';
import { CoursesService } from '../core/courses/courses.service';
import { NavigationService } from '../core/navigation/navigation.service';

describe('AddCourseComponent', () => {
  let component: CreateCourseComponent;
  let fixture: ComponentFixture<CreateCourseComponent>;

  let coursesServiceMock: {
    createCourse: jasmine.Spy,
  };

  let navigationServiceMock: {
    navigateByUrl: jasmine.Spy,
  };

  beforeEach(async(() => {
    coursesServiceMock = jasmine.createSpyObj('CoursesService', ['createCourse']);
    navigationServiceMock = jasmine.createSpyObj('NavigationService', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [ CreateCourseComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: CoursesService, useValue: coursesServiceMock },
        { provide: NavigationService, useValue: navigationServiceMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onSave', () => {
    it('should create course', () => {
      const title = 'title';
      const description = 'description';
      const duration = 1;
      const date = '1995-12-17';
      Object.assign(component, { title, duration, description, date });

      component.onSave();

      expect(coursesServiceMock.createCourse).toHaveBeenCalledWith(title, duration, description, new Date(date));
    });

    it('should navigate to courses', () => {
      component.onSave();
      expect(navigationServiceMock.navigateByUrl).toHaveBeenCalledWith(RouteName.Courses);
    });
  });

  describe('#onCancel', () => {
    it('should navigate to root', () => {
      component.onCancel();
      expect(navigationServiceMock.navigateByUrl).toHaveBeenCalledWith(RouteName.Root);
    });
  });
});
