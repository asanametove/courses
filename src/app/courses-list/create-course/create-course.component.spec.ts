import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseComponent } from './create-course.component';
import { FormsModule } from '@angular/forms';
import { RouteName } from '@shared/route-name';
import { CoursesService } from '@core/courses/courses.service';
import { NavigationService } from '@core/navigation/navigation.service';
import { CourseUpdateInfo } from '@shared/course';
import { MockComponent } from 'ng-mocks';
import { EditCourseFormComponent } from '../edit-course-form/edit-course-form.component';

describe('CreateCourseComponent', () => {
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
      declarations: [
        CreateCourseComponent,
        MockComponent(EditCourseFormComponent),
      ],
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
      const date = new Date('1995-12-17');

      component.onSave({ title, duration, description, date });

      expect(coursesServiceMock.createCourse).toHaveBeenCalledWith(title, duration, description, date);
    });

    it('should navigate to courses', () => {
      component.onSave({} as CourseUpdateInfo);
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
