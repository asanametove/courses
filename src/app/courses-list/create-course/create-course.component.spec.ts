import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseComponent } from './create-course.component';
import { FormsModule } from '@angular/forms';
import { RouteName } from '@shared/route-name';
import { CoursesService } from '@core/courses/courses.service';
import { NavigationService } from '@core/navigation/navigation.service';
import { CourseUpdateInfo } from '@shared/course';
import { MockComponent } from 'ng-mocks';
import { EditCourseFormComponent } from '../edit-course-form/edit-course-form.component';
import { BehaviorSubject } from 'rxjs';

describe('CreateCourseComponent', () => {
  let component: CreateCourseComponent;
  let fixture: ComponentFixture<CreateCourseComponent>;

  let coursesService: {
    createCourse: jasmine.Spy,
  };

  let navigationService: {
    navigateByUrl: jasmine.Spy,
  };

  beforeEach(async(() => {
    coursesService = jasmine.createSpyObj('CoursesService', ['createCourse']);
    navigationService = jasmine.createSpyObj('NavigationService', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [
        CreateCourseComponent,
        MockComponent(EditCourseFormComponent),
      ],
      imports: [ FormsModule ],
      providers: [
        { provide: CoursesService, useValue: coursesService },
        { provide: NavigationService, useValue: navigationService },
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
    beforeEach(() => {
      coursesService.createCourse.and.returnValue(new BehaviorSubject({}));
    });

    it('should create course', () => {
      const title = 'title';
      const description = 'description';
      const duration = 1;
      const date = new Date('1995-12-17');

      component.onSave({ title, duration, description, date });

      expect(coursesService.createCourse).toHaveBeenCalledWith(title, duration, description, date);
    });

    it('should navigate to courses', () => {
      component.onSave({} as CourseUpdateInfo);
      expect(navigationService.navigateByUrl).toHaveBeenCalledWith(RouteName.Courses);
    });
  });

  describe('#onCancel', () => {
    it('should navigate to root', () => {
      component.onCancel();
      expect(navigationService.navigateByUrl).toHaveBeenCalledWith(RouteName.Root);
    });
  });
});
